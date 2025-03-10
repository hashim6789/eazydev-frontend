interface FooterProps {}

// Footer Component
const LearnerFooter: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-blue-200">
          © {new Date().getFullYear()} EazyDev Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default LearnerFooter;
