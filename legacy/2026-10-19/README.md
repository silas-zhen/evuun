# EVUUN

Supply references, licensed images, versioned plans and service inquiry tools for agent conversations.

**Publisher:** Monolithos, LLC · **Support:** hello@monolithos.ai  
**Remote MCP:** https://evuun.com/mcp · **API:** 0.4.1 · **Tools:** 25

[Live developer entry](https://evuun.com/) · [Maintained guide](https://evuun.com/agent-guide) · [MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers/com.evuun%2Fnetwork/versions/0.4.1)

This repository contains public connection documentation, tool schemas and examples. The production backend and private account data are maintained separately.

## Connect

Configure a Streamable HTTP MCP connection at `https://evuun.com/mcp`. For Codex CLI:

```sh
codex mcp add evuun --url https://evuun.com/mcp
```

Public discovery, public plan capsules and unsent inquiry drafts work anonymously. An unsaved draft stays in the host: follow `next_step` to collect missing fields, then save the returned normalized draft through an effective grant. `public_plan_url` only views an exact public option; it does not transfer the draft to a buyer. Private owner data, saving inquiries and accepted progress receipts require the corresponding verified identity and effective grant. Connecting a tool does not grant financial authority.

The [anonymous Codex example](docs/codex-mcp.toml.example) needs no token. For a saved inquiry, an owner may separately allow the actual original Agent to follow only that inquiry and its quotes/orders until a visible finite cutoff. Its private read credential uses a [separate named host connection](docs/codex-followup.toml.example) alongside the ordinary connection; never paste the secret into chat or overwrite the daily connection. This is not OAuth refresh, a write grant or financial authority. See [host connection boundaries](docs/HOST_CONNECTIONS.md) and [the single-inquiry contract](docs/commerce-followups-v1.md). Isolated verification does not prove real owner-private native-host acceptance or a customer transaction.

## Try a conversation

> Find published Singapore airport-transfer references. Prepare a service plan using an actual returned item ID, then show its licensed image, comparison and route. Keep unknown prices unknown. Prepare an inquiry draft without sending it.

The sequence is `evuun_discover_services` → `evuun_prepare_service_plan` → `evuun_get_commerce_capsule`. A plan retains its ID, revision and selected option across rich JSON, Markdown fallback and hosted HTTPS presentation. See [the request example](examples/service-plan.json) and [the full tool catalog](tool-catalog.json).

Supported hosts may render the JSON and images directly. Hosted links and Markdown provide a fallback; iframe support and automatic window closing depend on the host.

## Hotels and transactions

`evuun_prepare_hotel_inquiry` prepares an unsent stay inquiry and lists missing requirements. `evuun_search_hotels` performs a real non-booking provider query with actual dates, occupancies, guest nationality and a stable idempotency key. A real query must be authorized; the example does not execute it. Unconfirmed public prices are omitted. Automatic hotel booking and MoR payment remain unavailable pending separate provider confirmation.

Local-service references are researched candidates, not asserted merchant partnerships, confirmed inventory or binding quotes. A real written quote and eligible supplier are required. The owner's separate Stripe checkout reviews the exact version, price and terms; no MCP tool charges a saved card. For the standard deposit model, EVUUN collects 20% of the customer total, with the remaining 80% governed by the accepted quote. A paid procurement request remains pending supply until actual confirmation, with the accepted deadline and full-refund responsibility shown.

Cash contribution-pool allocation is 40/25/35. Genesis Points use a separate 45/35/20 allocation and pending/vested/voided states; the Epoch 1 multiplier is 3.0x. Formula examples are not awards. GP are not offered for sale or cash redemption, and no future token or return is promised.

## Validation scope

On 2026-10-19 a real Codex CLI connected to the public endpoint and completed discovery, a versioned plan, three capsule views, and two unsent inquiry drafts. An anonymous progress query correctly required authorization. This proves the public native-client path, not a completed customer payment, booking, fulfillment, settlement or payout. No provider hotel query or charge was made by that client test.

See [the integration guide](docs/agent-guide.md), [the plan contract](contracts/agent-commerce-v1.ts), and [the media contract](contracts/commerce-media-v1.ts). Media retain individual source, creator, license and depiction restrictions; a contextual hotel photo is not a photograph of a supplied vehicle or a guaranteed room category.
