export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1f2937] to-[#030712] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#6d28d9]/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Unleash the Full Power of the Web?</h2>
          
          <p className="text-xl text-[#d1d5db] mb-10">
            Download WebNative now and transform your web experience. Free, open-source, and ready to use.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="#download" className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-white px-8 py-4 rounded-md text-lg font-medium hover:opacity-90 transition duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download for Windows
            </a>
            
            <div className="flex gap-4">
              <a href="#download-mac" className="border border-[#374151] hover:border-[#4b5563] text-white px-6 py-4 rounded-md text-lg font-medium transition duration-300 flex items-center justify-center">
                macOS
              </a>
              <a href="#download-linux" className="border border-[#374151] hover:border-[#4b5563] text-white px-6 py-4 rounded-md text-lg font-medium transition duration-300 flex items-center justify-center">
                Linux
              </a>
            </div>
          </div>
          
          <div className="text-[#9ca3af] text-sm">
            <p>Version 1.0.2 | Released June 15, 2023</p>
            <p className="mt-2">By downloading, you agree to our <a href="#terms" className="text-[#8a63d2] hover:text-[#a78bdd] underline">terms and conditions</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
