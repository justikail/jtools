import { Mail, Github, Users, PenToolIcon as Tool, Code, Bug } from "lucide-react";
import ContactForm from "@/components/form/contactForm";
import BreadCrumbs from "@/components/templates/breadCrumbs";

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <BreadCrumbs />
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter ">
              About J<span className="text-yellow-400">tools</span>
            </h1>
            <p className="max-w-[700px] text-gray-400 md:text-xl">
              Free tools for everyone. <span className="text-yellow-400">Jtools</span> is made to help u work smarter, not harder. With a modern interface and lightweight experience, our tools are built to save ur time—one task at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-[#1e2128]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400">Our Mission</h2>
              <p className="text-gray-400">
                At Jtools, we&lsquo;re dedicated to providing high-quality, free tools for developers, designers, and digital creators. Our platform is built with the latest technologies to ensure a seamless experience for all users.
              </p>
              <p className="text-gray-400">
                We believe that powerful tools should be accessible to everyone, regardless of their budget or technical expertise. That&lsquo;s why we&lsquo;ve created a suite of utilities that are both powerful and easy to use.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400">What We Offer</h2>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-yellow-400" />
                  <span>Developer utilities for everyday coding tasks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Bug className="h-5 w-5 text-yellow-400" />
                  <span>Bug hunting and debugging tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Tool className="h-5 w-5 text-yellow-400" />
                  <span>Productivity enhancers for digital workflows</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <span>Community-driven tool development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400">Get In Touch!</h2>
              <p className="text-gray-400">
                We value your input! If u have any questions, feature requests, or feedback, please don&lsquo;t hesitate to reach out. Just fill in the form below with ur message, and someone from our team will respond promptly. Let&lsquo;s
                work together to make Jtools even better for everyone.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>mininginformation1337@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Github className="h-5 w-5 text-yellow-400" />
                  <span>github.com/jtools</span>
                </div>
              </div>
            </div>
            <div className="bg-[#252a33] p-6 rounded-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
