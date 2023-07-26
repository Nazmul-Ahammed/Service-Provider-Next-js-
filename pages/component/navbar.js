import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-purple-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl">
            Service-Provider
          </div>
          <div className="flex space-x-4">
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/signup">signup</NavLink>
            <NavLink href="/bookingstatus">Booking Status</NavLink>
            <NavLink href="/workerlist">Worker List</NavLink>
            <NavLink href="/userlist">User List</NavLink>
            <NavLink href="/booking">Booking</NavLink>
            <NavLink href="/managerlist">Manager List</NavLink>
            <NavLink href="/about">About us</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{children}</span>
    </Link>
  );
}
