# Progression and Economy

## Goal

The first slice should prove recovery, loss, and value pressure without implementing a real marketplace, paid monetization, account backend, or server-authoritative production economy.

## Prototype Economy

| System | First Slice Behavior |
| --- | --- |
| Recovered gems | Counted and shown in post-run summary. |
| Recovered loot | Counted and assigned local prototype value. |
| Lost carried items | Shown after avatar loss or timeout. |
| Loadout | Simple local list of selected weapons/tools/utilities. |
| Currency | Placeholder local value only, not monetized. |
| Marketplace | Not implemented. |

## Progression Placeholder

Allowed:

- local run history
- recovered gem count
- item value summary
- basic unlock placeholder flags for tools/utilities
- operator notes or Archive messages

Not allowed in first slice:

- paid currency
- premium shop
- real money purchase flow
- account backend
- player trading
- production inventory trust on client

## Server Authority Planning

The final production economy should not trust the client. First slice data should be shaped so it can later move to server-authoritative validation:

- run id
- seed
- loadout
- extracted items
- lost items
- session duration
- extraction outcome
- suspicious metric flags

## Acceptance Criteria

- Extraction creates a readable result summary.
- Avatar loss visibly loses carried session items.
- Economy values are local placeholders and clearly not production final.
- No paid monetization appears in the slice.
- Data shape does not block future server-authoritative economy.
