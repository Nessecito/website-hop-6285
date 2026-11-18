# Habit-app onboarding research (Appllama usage playbook)

**Prompt simulated:** “How do the best habit apps structure onboarding — how long, what does each step earn, and where does the paywall sit?”

**Status:** Live Appllama MCP calls were **blocked in this Cloud Agent session**
(`mcp.appllama.io` not in egress allowlist; Appllama tools not authenticated).
This file records the exact research loop to run once MCP is connected, and a
working local research scaffold matching `appllama-usage`.

## Session start (free)

```
get_credits()
```

Confirm balance / reset date before spending credits.

## Find the category winners

```
search_apps(
  query="habit tracker streak goals daily routine",
  sort="revenue"   # or downloads — note which you chose
)
```

Shortlist **top 5** by revenue + downloads blend. Capture for each:

| App | App ID | Revenue ctx | Downloads | Screens | Flows of interest |
|---|---|---|---|---|---|
| _fill from MCP_ | | | | | Onboarding, Paywall, Welcome, Habit Check-in |

Then `get_app(app_id=…)` for each shortlist entry before deep walks.

## Flow grammar (category spine)

```
list_flows(query="onboarding")
get_flow_apps(flow="Onboarding")   # exact flow name from list_flows
get_flow_apps(flow="Paywall")
```

Chart across 3–5 apps:

| Question | App A | App B | App C | Convention? |
|---|---|---|---|---|
| Onboarding step count | | | | |
| What each step asks vs gives | | | | |
| Permission timing (notify / health) | | | | |
| Paywall: after onboarding / mid-flow / soft wall later | | | | |
| Presentation: push / sheet / modal | | | | |

## Walk screens in journey order

For each shortlisted app:

```
list_app_screens(app_id=…, flow="Onboarding")
# paginate with next_cursor until exhausted
list_app_screens(app_id=…, flow="Paywall")
```

Download images promptly (URLs expire ~1h). Ignore Appllama watermark.
Save under `research/habit-onboarding/<app-name>/img/` and notes in `screens.md`.

## Saturation rule

Stop when new screens stop changing the onboarding/paywall **spec**.
Do not harvest the catalog — answer this named question only.

## Spec draft (fill after live study)

- **Onboarding length:** _
- **Personalization pattern:** _
- **Primary CTA placement:** _
- **Paywall placement & framing:** _
- **Conventions we will keep:** _
- **Choices we will break knowingly:** _

## Connect MCP to finish this study

1. Cursor → Settings → Tools & MCP → **Appllama** → Connect (Pro).
2. Ensure Cloud Agent egress allows `mcp.appllama.io` if running in Cloud.
3. Re-ask: “Study top habit-app onboarding with Appllama; fill research/habit-onboarding.”
