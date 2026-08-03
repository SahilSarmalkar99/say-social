import WorkTemplate from "./WorkTemplate";
import ContentCreatingTemplate from "./ContentCreatingTemplate";
import DesignIdentityTemplate from "./DesignIdentityTemplate";
import FeaturedWorkTemplate from "./FeaturedWorkTemplate";

export default function HomePreview({ formData }) {
  switch (formData.section) {
    case "work":
      return <WorkTemplate formData={formData} />;

    case "content-creating":
      return (
        <ContentCreatingTemplate formData={formData} />
      );

    case "design-identities":
      return (
        <DesignIdentityTemplate formData={formData} />
      );

    case "featured-work":
      return (
        <FeaturedWorkTemplate formData={formData} />
      );

    default:
      return (
        <div className="flex min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] items-center justify-center rounded-2xl lg:rounded-3xl border-2 border-dashed border-gray-300 bg-white p-6 sm:p-10 text-center">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
              Live Preview
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Select a section to preview.
            </p>
          </div>
        </div>
      );
  }
}