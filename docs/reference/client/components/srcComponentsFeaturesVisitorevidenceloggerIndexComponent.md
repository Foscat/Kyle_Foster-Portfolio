# srcComponentsFeaturesVisitorevidenceloggerIndexComponent

- Source: `src/components/features/VisitorEvidenceLogger/index.jsx`

# srcComponentsFeaturesVisitorevidenceloggerIndexComponent

## components/features/VisitorEvidenceLogger

Route-aware loader for the independently hosted visitor evidence logger.

### module.exports()

Load one privacy-noticed page-view beacon for the active client-side route.

The remote client owns payload minimization and failure isolation. Replacing the
script after pathname changes records SPA navigation without collecting queries,
fragments, referrers, page contents, or form values.

**Parameters**

- `props` (`VisitorEvidenceLoggerProps`) - Logger loader configuration.

**Returns**

- `null` - This integration has no visible interface.

## VISITOR\_LOGGER\_SCRIPT\_URL

Public client-script endpoint for the private evidence logger.

- Type: `string`

## VisitorEvidenceLoggerProps

- Type: `Object`

**Properties**

- `enabled` (`boolean`, optional) - Overrides the production-only default for controlled tests.
- `onScriptChange` (`function`, optional) - Optional lifecycle observer.
