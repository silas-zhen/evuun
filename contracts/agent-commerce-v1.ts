/** v0.5 implementation contract, 2026-10-19. Reuses commerce-v1 facts/auth.
 * Public plan snapshots contain catalog facts only. Buyer intent, dates,
 * caller_task_ref and private quotes never enter public plan/capsule URLs.
 */
import type {Money, Quote, CommerceOrder, HotelSearchInput, HotelSearchResult} from './commerce-v1';
import type {PublicCommerceMedia} from './commerce-media-v1';

export type CapsuleView = 'plan'|'comparison'|'route'|'order';
/** An unsaved draft continues inside its host; no private intent enters a URL. */
export type PreparedInquiryContinuation = {
  owner_action_url:null;public_plan_url:string|null;
  next_step:{kind:'collect_missing_requirements'|'save_with_effective_grant';
    missing_fields:string[];resume_tool:'evuun_prepare_service_inquiry'|'evuun_prepare_hotel_inquiry';
    save_tool:'evuun_create_service_inquiry';required_scope:'requests:write';
    public_plan_url:string|null;sends_to_merchant:false;creates_financial_authority:false};
};
export type SupplyState = 'reference_only'|'pending_procurement'|'executable';
export type RouteNode = {
  id:string;label:string;latitude:number|null;longitude:number|null;
  source_url:string|null;coordinate_basis:string|null;
};
export type SupplyOption = {
  option_id:string;revision:string;source_item_id:string;
  title:string;city:string;service_kind:string;supply_status:SupplyState;
  supplier_id:string|null;fulfiller_name:string|null;
  specification:Record<string,unknown>;
  total:Money|null;pay_today:Money|null;balance_due:Money|null;
  fees_all_included:boolean|null;cancellation_terms:string|null;expires_at:number|null;
  media:PublicCommerceMedia|null;route_nodes:RouteNode[];
  travel_time_seconds:number|null;live_traffic_known:false;
  source:Record<string,unknown>;missing:string[];
};
export type CommercePlan = {
  id:string;revision:string;version:number;contract:'evuun.agent-commerce.v1';
  visibility:'public_catalog';options:SupplyOption[];
  conditions:{basis:'published_supply_reference';personal_intent_included:false};
  quote_required:true;created_at:number;
};
export type GenesisAllocation = {
  role:'caller_agent'|'buyer_owner'|'supplier_node';quantity:number;
  status:'pending'|'vested'|'voided';
};
export type GenesisReward = {
  name:'Genesis Points';rule:'physical-contribution-v1';sector_domain:'travel_hospitality';
  epoch:number;epoch_multiplier:number;sector_weight:1;
  contribution_base:Money|null;quantity:number|null;
  allocations:GenesisAllocation[];status:'pending'|'vested'|'voided';
  basis:'estimated_contribution'|'settled_contribution'|'refund_adjustment'|'unknown';
  missing:string[];cash_convertible:false;
};
export type AgentQuote = Quote & {
  option_id?:string|null;plan_id?:string|null;plan_revision?:string|null;
  supply_status?:SupplyState;
  procurement?:{confirmation_deadline:number;responsible_party:string;
    unfulfilled_refund:'full';basis_reference:string}|null;
  genesis?:GenesisReward;
};
export type AgentOrder = Omit<CommerceOrder,'status'|'quote'> & {
  status:CommerceOrder['status']|'paid_pending_supply';quote:AgentQuote;genesis?:GenesisReward;journey?:CommerceJourney;
};
export type CommercePresentation = {
  contract:'evuun.agent-commerce.v1';resource_id:string;revision:string;view:CapsuleView;
  visibility:'public_catalog'|'owner_private';
  plan:CommercePlan|null;quote:AgentQuote|null;order:AgentOrder|null;
  markdown:string;html_url:string;
  financial_authority:false;
  rendering:{native_json:true;markdown:true;hosted_html:true;
    iframe_support:'host_dependent';deterministic:true};
};
export type JourneyEvent = {
  sequence:number;order_id:string;event:string;created_at:number;
  kind:'order'|'payment'|'supply'|'fulfillment'|'cancellation_or_refund'|'reward'|'evidence';
  state_at_event:{order:string;payment:string;supply:string;reward:string;genesis:string|null}|null;
  historical_details_available:boolean;
  details_at_event?:Record<string,unknown>;
  /** State projection only; no guest/contact/payment secrets or raw audit evidence. */
  status?:string;payment_status?:string;supplier_status?:string;
};
export type CommerceJourney = {
  order_id:string;state:{order:string;payment:string;supply:string;reward:string;genesis:string|null};
  service:Record<string,unknown>;public_media:PublicCommerceMedia|null;private_detail_access:boolean;
  supplier_updates:'merchant_or_provider_reported';vehicle:null;driver:null;flight:null;
  payment?:Record<string,unknown>;supply?:Record<string,unknown>;fulfillment?:Record<string,unknown>;
  private_pending_media?:{id:string;mime:string;bytes:number;sha256:string;
    state:'private_pending_review';license_verified:false;created_at:number;authenticated_read_url:string}[];
};

/** Routes (same data envelope {data:...}, same error envelope and auth as v1):
 * POST /api/v1/commerce/plans/prepare {item_ids:string[1..4]}
 *      Anonymous immutable catalog snapshot. No PII/intent/remote HTML accepted.
 * GET /api/v1/commerce/plans/:id
 * GET /api/v1/commerce/capsules/:resource_id?view=plan|comparison|route|order
 *      resource_id = actual plan_*, quote_* or order_*; quote/order owner auth.
 * GET /capsule/:resource_id?view=...
 *      Product renderer; private resources use existing browser sign-in/resume.
 * GET /api/v1/commerce/orders/:id/events?after=0&limit=20
 *      Owner private, incremental sequence, no financial action.
 * Existing quote/order/payment routes remain canonical, including explicit
 * approved amount + exact quote version and price/terms hashes on order creation.
 * New inquiry optional fields:
 *   plan_id, plan_revision, option_id, caller_task_ref (private bounded string).
 * All three plan binding fields required together; server verifies source match.
 * Existing /caller/rewards also returns accepted attribution's sanitized events
 * and GP; no arbitrary owner-order access through public Agent control.
 *
 * MCP additions use these exact functions:
 * evuun_prepare_service_plan {item_ids}
 * evuun_get_commerce_capsule {resource_id,view?}
 * evuun_search_hotels {...HotelSearchInput,idempotency_key}
 * evuun_prepare_hotel_inquiry {destination,title,service_date,details,...}
 * Existing create/get inquiry, handoff and progress tools reuse this contract.
 * Hotel result = HotelSearchResult plus truthful missing/concierge action;
 * unverified prices remain omitted, no claim of automatic MoR booking.
 */
export type AgentHotelSearch = HotelSearchResult & {
  missing:string[];automatic_booking_available:boolean;
  concierge:{draft_available:true;staffed_followup_confirmed:false;binding:false;payment_started:false;
    prepare_tool:'evuun_prepare_hotel_inquiry';save_tool:'evuun_create_service_inquiry'};
};
export type AgentHotelSearchInput = HotelSearchInput & {idempotency_key:string};
