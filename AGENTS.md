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
