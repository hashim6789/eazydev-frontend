const AdminFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <div className="h-10"></div>

            {/* <img
                  src="https://www.canva.com/design/DAGc5urwc88/UNXhnJVSsb3zafIYhRLMKQ/view"
                  alt="dev"
                  className="h-8"
                /> */}
            <span className="text-sm">Virtual Class for Zoom</span>
          </div>

          <div className="w-full max-w-md">
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 rounded-l bg-gray-800 text-white"
              />
              <button className="bg-teal-500 text-white px-6 py-2 rounded-r">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="/careers" className="hover:text-white">
              Careers
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>

          <div className="text-sm text-gray-400">
            © 2021 Class Technologies Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
