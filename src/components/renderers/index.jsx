import { lazy, Suspense } from "react";

const lazyComponent = (importer, displayName) => {
  const Component = lazy(importer);

  const LazyComponent = (props) => (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );

  LazyComponent.displayName = displayName;
  return LazyComponent;
};

const CardGridBlock = lazyComponent(() => import("./blocks/CardGridBlock"), "CardGridBlock");
const FormBlock = lazyComponent(() => import("./blocks/FormBlock"), "FormBlock");
const HeroBlock = lazyComponent(() => import("./blocks/HeroBlock"), "HeroBlock");
const ImageGalleryBlock = lazyComponent(
  () => import("./blocks/ImageGalleryBlock"),
  "ImageGalleryBlock"
);
const LinksBlock = lazyComponent(() => import("./blocks/LinksBlock"), "LinksBlock");
const RichTextBlock = lazyComponent(() => import("./blocks/RichTextBlock"), "RichTextBlock");
const RichText = lazyComponent(() => import("./RichText"), "RichText");
const SectionRenderer = lazyComponent(() => import("./SectionRenderer"), "SectionRenderer");

export {
  CardGridBlock,
  FormBlock,
  HeroBlock,
  ImageGalleryBlock,
  LinksBlock,
  RichTextBlock,
  RichText,
  SectionRenderer,
};
