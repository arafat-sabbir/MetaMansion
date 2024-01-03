const Footer = () => {
   return (
      <footer>
         <div className="footer p-10 bg-[#0D1723] text-neutral-content">
            <aside>
               <img src="https://i.ibb.co/tb8CFXS/MEta-6.png" className="w-20 h-20"  alt="" />
               <p>
                  Meta Mention.
                  <br />
                  Providing reliable tech since 1992
               </p>
            </aside>
            <nav>
               <header className="footer-title">Services</header>
               <a className="link link-hover">Branding</a>
               <a className="link link-hover">Design</a>
               <a className="link link-hover">Marketing</a>
               <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
               <header className="footer-title">Company</header>
               <a className="link link-hover">About us</a>
               <a className="link link-hover">Contact</a>
               <a className="link link-hover">Jobs</a>
               <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
               <header className="footer-title">Legal</header>
               <a className="link link-hover">Terms of use</a>
               <a className="link link-hover">Privacy policy</a>
               <a className="link link-hover">Cookie policy</a>
            </nav>
         </div>
         <hr />
         <div className="footer  p-4 bg-[#0D1723] text-neutral-content">
            <aside className=" mx-auto grid-flow-col">
               <p>Copyright © 2024 - All right reserved</p>
            </aside>
         </div>
      </footer>
   );
};

export default Footer;
