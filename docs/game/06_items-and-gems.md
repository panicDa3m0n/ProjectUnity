# Items and Gems

## Goal

Gems of the void are the core objective. Loot and tools support risk decisions, extraction pressure, and future economy testing without requiring a real marketplace in the first slice.

## Loot Item Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable item id. |
| `displayName` | string | yes | Human-readable name. |
| `category` | enum | yes | `loot`, `weapon`, `tool`, `utility`, `quest`. |
| `rarity` | enum | yes | `common`, `uncommon`, `rare`, `anomalous`. |
| `carrySize` | int | yes | Prototype inventory size cost. |
| `baseValue` | int | yes | Local prototype value. |
| `roomTags` | list | yes | Spawn context tags. |
| `soundOnUseId` | string | no | Sound event emitted when used. |
| `botPriority` | int | yes | 1 to 5 bot pickup priority. |
| `sliceEnabled` | bool | yes | Whether item is active in first slice. |

## Gem Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable gem id. |
| `displayName` | string | yes | Operator-facing name. |
| `voidAspect` | enum | yes | `echo`, `memory`, `body`, `static`, `hunger`, `mercy`, or future aspect. |
| `rarity` | enum | yes | `faint`, `clear`, `deep`, `black`. |
| `instability` | number | yes | 0 to 1 risk/volatility. |
| `baseValue` | int | yes | Prototype recovery value. |
| `spawnRooms` | list | yes | Room ids/tags where gem can appear. |
| `scanText` | string | no | Placeholder flavor/identification text. |
| `botPriority` | int | yes | 1 to 5 bot pickup priority. |
| `sliceEnabled` | bool | yes | Whether gem is active in first slice. |

## First 8 Loot Items

| ID | Name | Category | Use |
| --- | --- | --- | --- |
| `loot_patient_tag` | Patient Tag | loot | Low-value hospital recovery item. |
| `loot_blood_vial` | Sealed Blood Vial | loot | Medium-value medical item. |
| `loot_archive_film` | Archive Film Strip | loot | Lore/economy test item. |
| `loot_surgical_steel` | Surgical Steel | loot | Crafting/economy placeholder. |
| `loot_pharmacy_keycard` | Pharmacy Keycard | quest | Opens placeholder locked container. |
| `loot_broken_pager` | Broken Pager | loot | Sound-flavor item, future signal use. |
| `loot_patient_file` | Patient File | loot | Archive-facing recovered information. |
| `loot_black_saline` | Black Saline Ampoule | loot | Rare high-risk item. |

## First 12 Gems

| ID | Name | Aspect | Rarity |
| --- | --- | --- | --- |
| `gem_echo_faint` | Faint Echo Gem | echo | faint |
| `gem_echo_clear` | Clear Echo Gem | echo | clear |
| `gem_memory_faint` | Faint Memory Gem | memory | faint |
| `gem_memory_deep` | Deep Memory Gem | memory | deep |
| `gem_body_clear` | Clear Body Gem | body | clear |
| `gem_body_black` | Black Body Gem | body | black |
| `gem_static_faint` | Faint Static Gem | static | faint |
| `gem_static_deep` | Deep Static Gem | static | deep |
| `gem_hunger_clear` | Clear Hunger Gem | hunger | clear |
| `gem_hunger_black` | Black Hunger Gem | hunger | black |
| `gem_mercy_faint` | Faint Mercy Gem | mercy | faint |
| `gem_mercy_deep` | Deep Mercy Gem | mercy | deep |

## Weapons, Tools, and Utilities

### Weapons/Tools

| ID | Name | Role |
| --- | --- | --- |
| `tool_scalpel` | Scalpel | Quiet short-range emergency weapon. |
| `tool_flash_probe` | Flash Probe | Interrupts or reveals enemy briefly, creates sound/light risk. |
| `tool_bolt_driver` | Bolt Driver | Loud tool/weapon for locked mechanisms and high-risk defense. |

### Utility Items

| ID | Name | Role |
| --- | --- | --- |
| `util_bandage` | Bandage | Restore small health amount. |
| `util_noise_disc` | Noise Disc | Throws a sound decoy. |
| `util_door_wedge` | Door Wedge | Slows enemy route through a door. |
| `util_battery_cell` | Battery Cell | Powers tool or extraction placeholder. |
| `util_sedative_mist` | Sedative Mist | Short enemy slow or escape window. |

## Acceptance Criteria

- Gems are clearly more important than generic loot.
- Loot and gem data can be represented without final art.
- Items have bot priorities for simulation.
- No real marketplace is required.
- No paid monetization is present.
