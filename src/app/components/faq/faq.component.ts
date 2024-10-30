import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  faqItems = [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a full range of web development services including custom website development, web applications, UI/UX design, and ongoing maintenance and support.',
      isOpen: false,
    },
    {
      question: 'How long does it take to complete a project?',
      answer:
        'Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while more complex web applications can take 3-6 months or more.',
      isOpen: false,
    },
    {
      question: 'What is your development process?',
      answer:
        'Our process includes discovery, planning, design, development, testing, and deployment phases. We maintain clear communication throughout and involve clients in key decisions.',
      isOpen: false,
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer various maintenance and support packages to ensure your website or application remains secure, up-to-date, and performing optimally.',
      isOpen: false,
    },
    {
      question: 'What technologies do you use?',
      answer:
        'We use modern technologies including Angular, React, Node.js, and other cutting-edge tools depending on project requirements.',
      isOpen: false,
    },
  ];
}
