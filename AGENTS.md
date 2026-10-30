# AGENTS.md — Anclora Portfolio

## Bootstrap de agentes

> [!IMPORTANT]
> This repository is governed by the Anclora canonical contracts under `.anclora/`.
> Agent-specific defaults, personal presets, or global agent configurations must NOT override those contracts.
> Read `.anclora/AGENT_PROJECT_CONTEXT.md` before starting substantial work.

Antes de realizar tareas sustanciales en este repositorio, el agente debe leer:

1. [`.anclora/AGENT_PROJECT_CONTEXT.md`](.anclora/AGENT_PROJECT_CONTEXT.md) (v1.0) y seguir su enrutamiento canónico hacia:
   - [`.anclora/PRODUCTION_RUNTIME.md`](.anclora/PRODUCTION_RUNTIME.md) para ejecución, infraestructura, base de datos, QA y Git.
   - [`.anclora/AOS_ADOPTION.md`](.anclora/AOS_ADOPTION.md) para gobernanza, estándares y autoridad AOS.

## Reglas operativas

- Modelo operativo: LOCAL CODE + PRODUCTION SERVICES.
- Trabajar en rama development.
- No tocar producción, migraciones destructivas ni secretos.

<!-- ANCLORA-AOS:START -->

## AOS bootstrap

This repository follows AOS (`AUTHORITY=anclora-governance`). Resolve canonical Governance ([AOS Adoption Standard](../anclora-governance/standards/AOS_ADOPTION_STANDARD.md)) and this repository's runtime contract `.anclora/PRODUCTION_RUNTIME.md`. Use `.anclora/AGENT_PROJECT_CONTEXT.md` as the minimal task router and `.anclora/AOS_ADOPTION.md` for adoption and exceptions, loading each only as the task requires. Do not assume generic defaults when a contract exists.
<!-- ANCLORA-AOS:END -->
