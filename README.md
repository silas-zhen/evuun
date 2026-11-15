# EVUUN

**Hotel stays through your agent.** Find hotel offers, inspect room details and cancellation terms, and prepare a selected quote for the traveler to review and pay.

Publisher: **Monolithos, LLC** · Support: **support@evuun.com**

Remote MCP: **https://evuun.com/mcp** · Transport: **Streamable HTTP**

[Documentation](https://evuun.com/docs/) · [Privacy](https://evuun.com/privacy/) · [Terms](https://evuun.com/terms/) · [Official MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers/com.evuun%2Fnetwork/versions/latest)

## Connect

Add `https://evuun.com/mcp` as a remote MCP server in your host. Complete the EVUUN OAuth authorization flow when prompted. Guest access covers supported pre-payment features; connect an EVUUN account to access its authorized arrangements. Guest access is not a promise of anonymous, credential-free API access.

Use the [host connection guide](docs/HOST_CONNECTIONS.md) for Manus, Perplexity Computer, Dify and other MCP hosts. This repository also includes a portable Agent Plugins configuration at its root (`plugin.json`, `mcp.json`). A host supporting that format can discover the connection configuration. Marketplace listing and host-specific acceptance are separate from having a valid package.

## Ask for a stay

> Find a hotel in Bangkok, Thailand, for two adults in one room, 10–12 January 2027. Guest nationality: Taiwan. Quote in USD, up to USD 200 total, with free cancellation if available. Show the actual room details and cancellation deadline. Wait for my selection before preparing a quote; do not pay.

Provide destination, dates, guests, guest nationality, currency and preferences. Missing conditions should be requested rather than guessed. Returned inventory, prices and cancellation deadlines determine what is actually available. Update example dates before use if they have passed.

Search and quote preparation do **not** mean the room is paid or confirmed. The traveler reviews the linked EVUUN page and continues to the hotel supplier's checkout. Preserve the distinction between a quote, payment, supplier confirmation and a refund status. Do not promise direct acceptance of agent-wallet or shared payment tokens.

## Current integration scope

The current public listing covers hotel stays. Flights, visa applications, restaurant reservations and the historical media/public-agent workflows are not advertised as capabilities of this release. Read the [integration guide](docs/agent-guide.md) and the [tool-name snapshot](tool-catalog.json); obtain actual inputs and available tools from the connected server's `tools/list`.

MCP discovery is globally public; this distribution adds no country allowlist. A host's availability, network access, supplier eligibility and returned hotel inventory remain separate facts. Directory publication does not automatically install EVUUN for every user or guarantee search-engine indexing.

## Release status

- Official Registry identity: `com.evuun/network`, metadata version **0.4.2**, published 15 November 2026.
- Portable package: **0.6.3-rc.2**, checked against the official Agent Plugins manifest and MCP JSON schemas. This is a distribution candidate, not a claim that each marketplace or host has approved it.
- This repository contains public configuration, documentation and historical contracts. It contains no production backend, account data, reviewer credentials or payment authority.
- The earlier distribution is retained in [legacy/2026-10-19](legacy/2026-10-19/). It is historical material, not the current installation contract. Existing historical validation results are not reused as acceptance results for the current hotel workflow.

## 中文

EVUUN 让你的 Agent 找酒店、核对房间证据与取消条款，再把选定报价交给你确认和付款。连接地址为 `https://evuun.com/mcp`，按宿主提示完成 OAuth；访客连接与账户连接的可用范围不同。搜索、生成报价都不代表已经付款或订成。

本发行面向全球公开发现，不主动增加地区白名单；平台自身可用范围与供应商当次可售结果分别说明。当前使用方式见接入文档，早期问店、媒体和公共 Agent 资料归入历史区。
