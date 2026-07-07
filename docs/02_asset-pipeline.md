# Asset Pipeline

Assets in The Archive use explicit review states:

- `placeholder`: Temporary internal work used to test layout, scale, readability, or system behavior.
- `candidate`: Proposed asset that may be reviewed for approval. AI-generated assets must start here.
- `approved`: Accepted asset that should not be replaced without explicit approval.
- `rejected`: Asset that should not be used in production or promoted without a new review decision.

Generated 3D assets must include the source prompt, tool used, license or terms note, polycount, texture sizes, and screenshots. Generated assets are never automatically approved.

Mobile performance is a hard constraint. Prefer low-poly geometry, atlased textures, limited material counts, and silhouettes that remain readable from a top-down mobile camera.

Do not introduce paid assets, subscriptions, SDKs, or external services unless the assigned task explicitly asks for them.
