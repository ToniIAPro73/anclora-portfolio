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

<!-- ANCLORA-MODS:START -->

## Anclora canonical contract bootstrap

Read these repository sources before substantial work, in order: `.anclora/AGENT_PROJECT_CONTEXT.md`, `.anclora/PRODUCTION_RUNTIME.md`, and `.anclora/AOS_ADOPTION.md`. Apply the authority hierarchy and shared operating defaults in [Anclora Mods](../anclora-mods/contracts/ANCLORA_COMMON_AGENT_CONTRACT_V1.md). Keep hosting, runtime, database, QA, and Git profile decisions sourced from this repository's contracts.
<!-- ANCLORA-MODS:END -->
