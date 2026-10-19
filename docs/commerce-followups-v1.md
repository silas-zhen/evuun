# Single-inquiry Agent follow-up

2026-10-19 operating increment. Principal decision: one finite, owner-approved read permission for the original Agent, independent of the original one-hour connection. Implementation and isolated verification are separate from production activation and a real customer transaction. Types: `commerce-followups-v1.ts`.

## Owner entry and consent

Reuse the existing saved inquiry, quote review and order pages. Retrieve `GET /api/v1/commerce/requests/:rid/followups` with the verified owner session and the existing response envelope. The response supplies the actual original Agent, source grant, eligible state, suggested/maximum cutoff, display timezone and existing permissions. Do not derive Agent identity from a URL or editable request field.

Explain: “Allow [actual Agent] to read this inquiry and its quotes/order until [exact date, time, timezone]. No booking, payment, changes, cancellation or withdrawal permission. You can stop this access here.” This is a separate explicit approval, not a silent extension of the one-hour grant. Default: end of the service day in the known service timezone plus 14 days; unknown date: 14 days from issue. Absolute maximum: 30 days from issue. The owner sees and submits the actual finite timestamp; changing a journey does not move it. A more distant trip may need a later explicit finite permission.

`POST` the same path with `{agent_id, expires_at, consent:true}` and a stable `Idempotency-Key`. If an active permission exists, an intentional replacement must name `replace_authorization_id`; the old credential stops. Response: `{authorization, credential, credential_available, created, next_step}`. The secret is returned only on first successful issue. Retries return the same authorization metadata and `credential:null`, never minting or revealing another token. Server storage and audit contain only its digest. If delivery is unknown, read the existing authorization first; explicitly revoke/replace if the secret was lost.

Deliver the credential through the existing secure host configuration control. Use it as a private bearer on `https://evuun.com/mcp`, separate from the ordinary `requests:write` connection. Never send it to a model conversation, URL, public capsule, source repository or shared receipt. This increment does not implement owner-private OAuth refresh, automatic host installation or an unattended runner.

`POST /api/v1/commerce/requests/:rid/followups/:fid/revoke` with `{}` and a stable key stops platform reads. Repeating revoke is harmless. Metadata states: `active`, `refund_only`, `expired`, `revoked`, `invalidated`; `effective_expires_at` reflects any shorter refund cutoff. Ordinary profile edits do not invalidate permission. Original grant natural expiry does not end it; explicit source recall, owner security/auth version change, restricted account state or inactive original Agent does.

## Read boundary

The dedicated credential supports only these existing tools:

- `evuun_get_service_inquiry`: this one inquiry with necessary buyer fields and actual derived quote/order projections.
- `evuun_list_service_inquiries`: at most this explicitly approved inquiry.
- `evuun_get_commerce_capsule`: only this inquiry's derived quotes/orders, with a limited private projection.
- `evuun_list_commerce_progress`: accepted original Agent attribution within this inquiry, current status and sanitized event sequence. Reads never add rewards or attribution.

It is not an ordinary grant or owner session. All writes, handoff creation, payment, cancellation, changes, settlement and withdrawal are rejected. It does not reveal unrelated history, raw inquiry free text, host task references, attachments, provider references, payment secrets, merchant credentials, internal cost/pool accounting, guest identity or raw merchant evidence. Only explicit buyer-facing quote terms, service details and order/refund status are projected. The order has `allowed_actions:["refresh"]`; hosted private links still require the owner's normal login.

Cancellation switches the affected order to cancellation/refund state and amounts only. Its cutoff is the earlier of the original approved expiry and 14 days after the actual cancellation request/failure. If all orders are cancelled, the inquiry projection is refund-only. No automatic extension is created for a delayed refund. Financial processing and the owner's own website records remain separate from this read permission.

The original ordinary `requests:write` route is unchanged: same-grant private inquiry recovery; a new grant for the same account/Agent can read existing accepted attribution's limited status/reward receipts but not the old inquiry's private details. `updates:read` alone remains insufficient for commercial progress.

## Late quote and original attribution

A read returns the exact quote's `owner_action_url` at `/commerce/#/review/:quote_id`. GET creates no invocation or order. The existing owner review displays the original Agent and exact quote version, price and terms. After the owner's explicit acceptance, call:

`POST /api/v1/commerce/requests/:rid/followups/:fid/accept-quote`

Body: `{quote_id, quote_version, price_sha256, terms_sha256, approved_pay_today_minor, consent:true, accept_original_agent:true}` plus a stable idempotency key. No caller-supplied Agent, replacement grant or invocation is accepted. The server validates this finite permission, the actual original request/Agent, unchanged account security state, unrecalled source and exact current quote. Cancelled inquiries cannot acquire fresh attribution through this route.

This explicit owner action creates a version-bound confirmation and invokes the existing idempotent order acceptance. It never starts checkout or contacts a provider. `_caller` retains the original Agent/account/source grant and records the separate follow-up authorization. Already accepted order attribution is never replaced. Changed/expired quotes and recalled/expired permission fail closed. An unknown result is recovered from the owner's existing inquiry/order, not by inventing a new request or attribution. Payment remains the existing separate owner action.

## Verification boundary

Only disposable identities, a test commerce ledger and synthetic merchants/providers are used until a real buyer exists. Production credentials are not issued for a fictional trip. A successful local flow is not a merchant agreement, paid order, customer adoption or fulfillment. Publication of the implementation is recorded separately in the operating batch receipt.
