import WorkTemplate from "./WorkTemplate";
import ContentCreatingTemplate from "./ContentCreatingTemplate";
import DesignIdentityTemplate from "./DesignIdentityTemplate";
import FeaturedWorkTemplate from "./FeaturedWorkTemplate";

export default function HomePreview({ formData }) {
  switch (formData.section) {
    case "work":
      return <WorkTemplate formData={formData} />;

    case "content-creating":
      return <ContentCreatingTemplate formData={formData} />;

    case "design-identities":
      return <DesignIdentityTemplate formData={formData} />;

    case "featured-work":
      return <FeaturedWorkTemplate formData={formData} />;

    default:
      return (
        <div className="rounded-3xl border-2 border-dashed p-20 text-center text-gray-400">
          Select a section to preview
        </div>
      );
  }
}