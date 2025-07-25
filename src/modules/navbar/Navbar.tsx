import Image from "next/image";
import { User, ChevronDown, AlignJustify } from 'lucide-react';

export default function Navbar() {

  const items = [
    { name: 'Dashboard', url: '/navIcons/dashboard.svg' },
    { name: 'Cameras', url: '/navIcons/cctv.svg' },
    { name: 'Scenes', url: '/navIcons/scenes.svg' },
    { name: 'Incidents', url: '/navIcons/incidents.svg' },
    { name: 'Users', url: '/navIcons/users.svg' },
  ];

  return (
    <nav className="flex w-full bg-black text-white px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Image
          src="./siteIcon.svg"
          alt="MANDLACX"
          width={20}
          height={20}
        />
        <h1 className="text-slate-50 text-lg font-semibold">MANDLACX</h1>
      </div>
      <div className="relative flex flex-[1] items-center lg:justify-center justify-end px-4">
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-[70%] h-[150px] rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-500 blur-[200px] opacity-50" />
        </div>
        <AlignJustify className="lg:hidden text-slate-50 cursor-pointer"/>
        <ul className="list-none p-0 m-0 lg:flex justify-center gap-8 text-sm hidden">
          {items.map((item: { name: string, url: string }) =>
            <li className="flex gap-1 items-center cursor-pointer" key={item.name}>
              <div className="w-4 h-4 relative">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{item.name}</span>
            </li>)}
        </ul>
      </div>
      <div className="sm:flex items-center gap-2 hidden">
        <User className="rounded-full bg-slate-300 w-10 h-10 p-2" />
        <div className="flex flex-col">
          <p className="whitespace-nowrap">User Name</p>
          <p className="text-sm">user@email.com</p>
        </div>
        <ChevronDown className="w-4 h-4" />
      </div>
    </nav>
  )
}