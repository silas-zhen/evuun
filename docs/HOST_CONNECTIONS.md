# Connect EVUUN to your host

Updated 15 November 2026. These are setup instructions, not a record of completed host tests or public marketplace approval.

## Shared settings

| Setting | Value |
|---|---|
| Name | EVUUN |
| Remote URL | `https://evuun.com/mcp` |
| Transport | Streamable HTTP |
| Authorization | EVUUN OAuth; dynamic client registration where supported |
| Documentation | https://evuun.com/docs/ |

Use the host's remote MCP/OAuth setup. Review the requested access. Guest mode covers supported pre-payment operations; account mode accesses only authorized arrangements. Do not copy browser cookies, shared administrator keys or reviewer credentials into public configuration. Installation does not authorize spending.

## Manus

Open Connectors, choose Create, and add an MCP server by URL. Enter the shared name and URL, then follow authorization. You can associate the connection with a Project; Project sharing does not mean inclusion in the global connector catalog. [Official connector guide](https://www.manus.im/features/connectors).

## Perplexity Computer

Use the custom remote connector entry available to your account. Enter the MCP URL and choose OAuth; select Streamable HTTP if a transport field appears. Complete authorization and enable the connector for the intended conversation or Computer workflow. Button labels and availability depend on the current account. [Official announcement](https://www.perplexity.ai/changelog/what-we-shipped---march-13-2026).

Perplexity Agent API Project connectors are a separate integration. Their documented API Key/None setup must not be treated as a substitute for EVUUN OAuth, or configured as anonymous access without a supported server path. [API connector documentation](https://docs.perplexity.ai/docs/agent-api/tools/connectors).

## Dify: native MCP first

In Integrations > Tools, add an MCP server. Enter the shared URL, name EVUUN and server identifier `evuun`. Leave Dynamic Client Registration enabled, complete the EVUUN authorization, and import its tools. Keep that identifier stable: exported apps also refer to it, so another workspace must create the matching connection before using those apps. Refresh the tool list deliberately when a server release changes it. [Official Dify tools guide](https://docs.dify.ai/en/cloud/use-dify/workspace/tools).

A dedicated Marketplace tool plugin is a separate publication route. It is not required to make the existing remote server available within an authorized Dify workspace. Do not label a normal ZIP as a `.difypkg`.

## Cursor and portable-plugin hosts

The root `plugin.json` and `mcp.json` use Agent Plugins 1.0.0, which Cursor supports. The repository provides configuration only; finish the host's normal authorization. A valid manifest does not establish Cursor Marketplace approval. [Cursor plugin formats](https://cursor.com/docs/reference/plugins).

## Other MCP clients

Use the shared remote URL through the client's supported HTTP/OAuth configuration. The root `mcp.json` is portable plugin data, not a universal settings-file format for every client. Do not rename it into a client-specific settings file without checking that client's format.

## Recovery and completion

If authorization is required, use the host's normal reconnect action and return to the existing task. Keep identifiers from actual responses; do not create replacement arrangements merely because a connection failed. Explain an unavailable tool or expired quote rather than inventing a successful action. Repricing and reconnect acceptance remain tied to the deployed service's actual behavior.

The traveler decides whether to accept an offer and complete checkout. Do not interpret connection success, an imported tool, a prepared quote, or an opened payment page as a paid booking.
