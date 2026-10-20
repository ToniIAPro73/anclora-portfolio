# Checklist de validación — mecanismo de promoción

**Alcance:** añadir `.github/workflows/promote.yml` (mismo workflow fast-forward que el resto de repos Anclora) y declararlo en `.anclora/PRODUCTION_RUNTIME.md` (`PROMOTION_MECHANISM`, `PROMOTION_FLOW`, `PROMOTION_SUPPORTED=true`).

## Comprobaciones ejecutadas

| Comprobación                                 | Resultado             |
| -------------------------------------------- | --------------------- |
| Workflow idéntico al de `anclora-advisor-ai` | `cmp` sin diferencias |
| Integridad del diff                          | `git diff --check`    |

## Verificación visual

No aplica: solo workflow y documentación de contrato; sin cambios en la aplicación.

## Promoción

Se alinean `staging`, `production` y `main` con `development` por fast-forward manual, salvo que el CI de `development` falle.
