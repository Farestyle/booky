function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-900 py-16 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div>
          <div className="text-lg font-black tracking-widest text-white uppercase mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Bibliotheca</div>
          <p className="text-xs mb-6 text-zinc-500">Shaping the future of reading, design, and knowledge visualization.</p>
          <form className="flex flex-col gap-2">
            <label className="text-xs text-zinc-500 uppercase">Subscribe to our dispatch</label>
            <div className="flex rounded-full overflow-hidden border border-zinc-800 bg-zinc-900">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-zinc-950 px-4 py-3 text-zinc-200 text-xs focus:outline-none"
              />
              <button className="bg-amber-500 px-5 py-3 text-xs font-bold text-zinc-950 transition hover:bg-amber-400">Join</button>
            </div>
          </form>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-amber-500 pl-3">Navigation</h4>
          <ul className="space-y-3 text-xs">
            <li><a href="/#" className="hover:text-amber-500">Home Catalog</a></li>
            <li><a href="#info" className="hover:text-amber-500">The Institution</a></li>
            <li><a href="#shop" className="hover:text-amber-500">Editions Collection</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-amber-500 pl-3">Help & Policy</h4>
          <ul className="space-y-3 text-xs">
            <li><a href="#" className="hover:text-amber-500">Digital Rights</a></li>
            <li><a href="#" className="hover:text-amber-500">Cookie Protocol</a></li>
            <li><a href="#" className="hover:text-amber-500">Corporate License</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-amber-500 pl-3">Contact Center</h4>
          <div className="space-y-3 text-xs">
            <p><i className="fa-solid fa-location-dot mr-2 text-amber-500"></i> Milan, IT / Virtual HQ</p>
            <p><i className="fa-solid fa-envelope mr-2 text-amber-500"></i> archive@bibliotheca.design</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
        <div>&copy; 2026 Bibliotheca Digital Architecture. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-400">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
