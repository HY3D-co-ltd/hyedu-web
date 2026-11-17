# Triage Labels

The skills speak in terms of five canonical triage roles and a `spec` label. This file maps them to the actual label strings used in this repo's issue tracker.

| Role              | Label in our tracker | Meaning                                       |
| ----------------- | -------------------- | --------------------------------------------- |
| `needs-triage`    | `needs-triage`       | Maintainer needs to evaluate this issue       |
| `needs-info`      | `needs-info`         | Waiting on reporter for more information      |
| `ready-for-agent` | `ready-for-agent`    | A published ticket (see below)                |
| `ready-for-human` | `ready-for-human`    | Requires human implementation                 |
| `wontfix`         | `wontfix`            | Will not be actioned                          |
| `spec`            | `spec`               | A spec that tickets are split from (see below) |

`ready-for-agent` marks a ticket: an issue whose body follows the ticket format that `to-tickets-skeleton` publishes (the example under `<!-- contract: ticket -->` in its SKILL.md). On a GitHub tracker, `autopilot check <issue URL>` must report no problem other than `Open blocker: <ref>` lines before the label goes on; an open predecessor is a wait, not a fault in the ticket. The label is not a run request: the autopilot starts a run only for an issue carrying the `autopilot` label.

`spec` marks a spec: the issue a design session publishes as the input that tickets are split from. A spec is not a ticket and stays outside the triage states, so it never carries one of the five roles above.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use. Repos that receive unattended design must keep the `spec` and `ready-for-agent` rows at their default label strings: the autopilot's ticketing run uses those literal labels rather than reading this mapping.
