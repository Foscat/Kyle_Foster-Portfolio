# srcComponentsRenderersBlocksHeroblockIndexRenderer

- Source: `src/components/renderers/blocks/HeroBlock/index.jsx`

# srcComponentsRenderersBlocksHeroblockIndexRenderer

## src\\components\\renderers\\blocks\\HeroBlock\\index

src\components\renderers\blocks\HeroBlock\index module.

## components/PageHeader

Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.

### HeroBlock

A reusable page header component designed to provide a consistent and visually appealing introduction to pages and major sections. It combines a prominent title with optional supporting information such as job titles, timespans, descriptive subtitles, and associated technologies.

**Parameters**

- `props` (`Object`) - Component props.
- `props.title` (`string`) - Main page or section title.
- `props.jobTitle` (`string`, optional) - Optional role or position title.
- `props.timespan` (`string`, optional) - Optional date range or duration string.
- `props.subTitle` (`string`, optional) - Supporting descriptive text rendered beneath the title.
- `props.tech` (`Array<Object>`, optional) - List of technologies associated with the page or project.
- `props.className` (`string`, optional) - Optional additional CSS class names.

**Returns**

- `JSX.Element` - Rendered page header.

**Examples**

```js
```js
<HeroBlock
  title="My Portfolio"
  jobTitle="Software Engineer"
  timespan="2020 - Present"
  subTitle="Welcome to my personal portfolio showcasing my projects and experience."
  tech={[
      { label: "React", type: "react" },
      { label: "JavaScript", type: "javascript" },
      { label: "CSS", type: "css" }
    ]}
/>
```
```
