/** Additive owner-only single-inquiry follow-up contract. Unix times are seconds.
 * A returned credential is secret: secure host storage only, never chat or URLs.
 */
export type FollowupStatus = 'active' | 'refund_only' | 'expired' | 'revoked' | 'invalidated';
export interface InquiryFollowup {
  id: string; request_id: string; agent_id: string; source_grant_id: string;
  scope: 'commerce_inquiry:read'; status: FollowupStatus;
  issued_at: number; expires_at: number; effective_expires_at: number; revoked_at: number | null;
  refund_followup_seconds: number; automatic_renewal: false; financial_authority: false;
}
export interface InquiryFollowupReview {
  request_id: string; scope: 'commerce_inquiry:read';
  agent: {id: string; display_name: string} | null;
  source_grant_id: string | null; can_issue: boolean; blocked_reason: string | null;
  suggested_expires_at: number | null; maximum_expires_at: number;
  display_timezone: string; refund_followup_seconds: number;
  items: InquiryFollowup[]; financial_authority: false;
  credential_delivery: 'private_bearer_once';
}
export interface IssueInquiryFollowup {
  agent_id: string; expires_at: number; consent: true;
  /** Required to replace an existing active permission; the old token stops. */
  replace_authorization_id?: string;
}
export interface IssuedInquiryFollowup {
  authorization: InquiryFollowup; credential: string | null;
  credential_available: boolean; created: boolean; next_step: string;
}
export interface AcceptOriginalAgentQuote {
  quote_id: string; quote_version: number; price_sha256: string; terms_sha256: string;
  approved_pay_today_minor: number; consent: true; accept_original_agent: true;
}
/** Owner-session HTTP endpoints; use the existing evuun/v0.1 envelope.
 * GET  /api/v1/commerce/requests/:rid/followups -> InquiryFollowupReview
 * POST same URL + Idempotency-Key -> IssuedInquiryFollowup
 * POST /:rid/followups/:fid/revoke {} -> {authorization,platform_read_stopped:true}
 * POST /:rid/followups/:fid/accept-quote AcceptOriginalAgentQuote
 *   -> {order: existing CommerceOrder,authorization,owner_action_url,payment_started:false}
 * GETs create no invocation or order. accept-quote is an explicit owner action;
 * original Agent and source grant come from the verified inquiry permission.
 * Unknown accept outcome: read the owner's existing inquiry/order before retry.
 */
