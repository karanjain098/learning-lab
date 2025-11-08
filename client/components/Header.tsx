import { Link } from "react-router-dom";
import { Menu, ChevronDown, UserCircle, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, customRoles, switchActiveRole, logout } = useAuth();

  const navigationItems = [
    {
      label: "Learn",
      content: [
        { label: "Courses", path: "/courses", description: "Browse all available courses" },
        { label: "Guided Labs", path: "/labs", description: "Hands-on learning experiences" },
        { label: "Learning Paths", path: "/learning-paths", description: "Structured learning journeys" }
      ]
    },
    {
      label: "Certifications",
      content: [
        { label: "Browse Certifications", path: "/certifications", description: "Explore professional certifications" },
        { label: "My Certifications", path: "/my-certifications", description: "View your earned certifications" }
      ]
    }
  ];

  const adminItems = currentUser?.permissions.manageUsers || currentUser?.roles.includes("admin") ? [
    { label: "Admin Panel", path: "/admin" },
    { label: "Manage Users", path: "/admin/users" },
    { label: "Analytics", path: "/admin/analytics" }
  ] : [];

  const contentItems = currentUser?.permissions.create || currentUser?.roles.includes("writer") ? [
    { label: "Content Editor", path: "/editor" },
    { label: "My Content", path: "/content" },
    { label: "Drafts", path: "/content/drafts" }
  ] : [];

  const getRoleDisplayName = (roleId: string): string => {
    const role = customRoles.find((r) => r.id === roleId);
    return role ? role.name : roleId.charAt(0).toUpperCase() + roleId.slice(1);
  };

  const handleRoleSwitch = (newActiveRole: string) => {
    if (currentUser) {
      switchActiveRole(currentUser.id, newActiveRole);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-slate-900 hidden sm:inline">
                Skills Enhance
              </span>
            </Link>

            {/* Main Navigation Menu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {item.content.map((subItem) => (
                          <li key={subItem.path}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100"
                              >
                                <div className="text-sm font-medium text-slate-900">
                                  {subItem.label}
                                </div>
                                <p className="text-sm leading-snug text-slate-600">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <Link to="/about" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Admin/Content Creator Menu */}
                {(adminItems.length > 0 || contentItems.length > 0) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Manage <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {adminItems.length > 0 && (
                        <>
                          <DropdownMenuLabel>Admin</DropdownMenuLabel>
                          {adminItems.map((item) => (
                            <DropdownMenuItem key={item.path} asChild>
                              <Link to={item.path}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                          {contentItems.length > 0 && <DropdownMenuSeparator />}
                        </>
                      )}
                      {contentItems.length > 0 && (
                        <>
                          <DropdownMenuLabel>Content</DropdownMenuLabel>
                          {contentItems.map((item) => (
                            <DropdownMenuItem key={item.path} asChild>
                              <Link to={item.path}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {currentUser.roles.length > 1 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                        {currentUser.roles.map((role) => (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className="flex items-center justify-between"
                          >
                            {getRoleDisplayName(role)}
                            {currentUser.activeRole === role && (
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationItems.map((section) => (
              <div key={section.label} className="space-y-2">
                <div className="font-medium text-sm text-slate-900">{section.label}</div>
                <div className="pl-4 space-y-2">
                  {section.content.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              to="/about"
              className="block text-sm text-slate-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-sm text-slate-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {currentUser && (adminItems.length > 0 || contentItems.length > 0) && (
              <div className="space-y-2">
                <div className="font-medium text-sm text-slate-900">Manage</div>
                <div className="pl-4 space-y-2">
                  {adminItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {contentItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );



  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-slate-900 hidden sm:inline">
                Skills Enhance
              </span>
            </Link>

            {/* Main Navigation Menu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {item.content.map((subItem) => (
                          <li key={subItem.path}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100"
                              >
                                <div className="text-sm font-medium text-slate-900">
                                  {subItem.label}
                                </div>
                                <p className="text-sm leading-snug text-slate-600">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <Link to="/about" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Admin/Content Creator Menu */}
                {(adminItems.length > 0 || contentItems.length > 0) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Manage <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {adminItems.length > 0 && (
                        <>
                          <DropdownMenuLabel>Admin</DropdownMenuLabel>
                          {adminItems.map((item) => (
                            <DropdownMenuItem key={item.path} asChild>
                              <Link to={item.path}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                          {contentItems.length > 0 && <DropdownMenuSeparator />}
                        </>
                      )}
                      {contentItems.length > 0 && (
                        <>
                          <DropdownMenuLabel>Content</DropdownMenuLabel>
                          {contentItems.map((item) => (
                            <DropdownMenuItem key={item.path} asChild>
                              <Link to={item.path}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {currentUser.roles.length > 1 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                        {currentUser.roles.map((role) => (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className="flex items-center justify-between"
                          >
                            {getRoleDisplayName(role)}
                            {currentUser.activeRole === role && (
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationItems.map((section) => (
              <div key={section.label} className="space-y-2">
                <div className="font-medium text-sm text-slate-900">{section.label}</div>
                <div className="pl-4 space-y-2">
                  {section.content.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              to="/about"
              className="block text-sm text-slate-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-sm text-slate-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {currentUser && (adminItems.length > 0 || contentItems.length > 0) && (
              <div className="space-y-2">
                <div className="font-medium text-sm text-slate-900">Manage</div>
                <div className="pl-4 space-y-2">
                  {adminItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {contentItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block text-sm text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Authentication Buttons */}
            <div className="pt-4 border-t border-slate-200">
              {currentUser ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button size="sm" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
