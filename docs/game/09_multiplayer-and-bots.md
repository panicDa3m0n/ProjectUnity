# Multiplayer and Bots

## Goal

The first slice is not real multiplayer. It should still be designed so future multiplayer and bot simulation are not blocked by early assumptions.

## First Slice Scope

Included:

- single-player local session
- bot-compatible session state
- deterministic room graph
- deterministic enemy state inputs
- session metrics useful for bot evaluation

Not included:

- real matchmaking
- real PvP
- account backend
- server transport
- authoritative inventory validation
- voice/chat/social systems

## Bot-Compatible Session Simulation

Bot simulation should eventually be able to:

- choose routes through room graph
- evaluate visible loot and gems
- react to enemy threat
- decide whether to extract
- emit movement/interact/use-item commands
- consume sound and detection data

## Future Multiplayer Constraints

The first slice should avoid:

- hardcoding global singletons that assume only one avatar forever
- mixing UI, input, and gameplay state too tightly
- trusting client inventory as final truth
- making enemy logic depend on camera-only visibility
- making extraction logic depend on local-only UI state

## Acceptance Criteria

- Session rules can be expressed without network transport.
- Bot inputs can use the same action concepts as human input.
- Metrics can compare bot and human sessions.
- Real multiplayer remains explicitly out of scope for the first slice.
