import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Phone } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-[#00274C] text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-xl font-bold">
              <span className="text-[#FFCB05]">BigM</span>Properties
            </a>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-[#FFCB05]">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-white hover:text-[#FFCB05]">
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
