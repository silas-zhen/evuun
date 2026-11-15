# EVUUN hotel integration

Use the [connection guide](HOST_CONNECTIONS.md) and the live MCP schemas. The current release's directory tools were observed as `evuun_find`, `evuun_open`, `evuun_book`, `evuun_list`, `evuun_watch`, `evuun_change`, `evuun_rebate` and `evuun_rebate_use`. Availability and inputs depend on authorization and the current server; this list is not an immutable schema or a permission grant.

1. Collect destination, future dates, guest counts, guest nationality, currency and preferences.
2. Find returned offers and explain only their actual evidence, total price and cancellation terms. Missing facts remain missing.
3. Let the traveler select an offer before preparing a quote. Use returned identifiers and the server's idempotency contract for retries.
4. Present the returned hosted page. A prepared quote is not paid or confirmed; the traveler completes supplier checkout separately.
5. Read arrangement/payment/supplier/refund states distinctly within the authorized account. Obtain explicit user approval for changes or cancellation. A refund initiated or reported by the service is not independent proof of bank settlement.

Rebate tools do not imply that hotel rebate redemption is currently available. Do not apply a balance or initiate any financial action merely to demonstrate a connector.

## Agents without MCP

Agents can read https://evuun.com/docs/ to understand EVUUN. A browser may follow an authorized hosted arrangement link supplied by the service. This does not establish an unauthenticated public API for creating the first search. No new public REST/OpenAPI, A2A endpoint or universal zero-install booking route is claimed here. Use only a documented, available route and keep the user's approval boundary.

## Historical material

The [October archive](../legacy/2026-10-19/) preserves earlier contracts and examples for reference. Do not use their old tool names, anonymous grants, payment rules or test outcomes as a description of this hotel release.
