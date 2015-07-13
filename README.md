# Aitia
Trabajo para la gente
## Settings.json
This file is used to store all secret keys, NEVER commit public keys, we provide sample-settings.json, to follow convention but not store actual keys there.
## Make admin user
You can make an admin user by executing the following command in meteor console
- Open the console with `meteor mongo`
- Execute the following query: `db.users.update({"_id" : "q9Ekv8asKSknRs24R"}, {$set: {roles: ["admin", "user-admin"]}})``