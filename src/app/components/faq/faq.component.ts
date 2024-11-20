import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  faqItems = [
    {
      question: 'faq.servicesOffered',
      answer: 'faq.servicesAnswer',
      isOpen: false,
    },
    {
      question: 'faq.projectTimeline',
      answer: 'faq.timelineAnswer',
      isOpen: false,
    },
    {
      question: 'faq.developmentProcess',
      answer: 'faq.processAnswer',
      isOpen: false,
    },
    {
      question: 'faq.ongoingSupport',
      answer: 'faq.supportAnswer',
      isOpen: false,
    },
    {
      question: 'faq.technologiesUsed',
      answer: 'faq.technologiesAnswer',
      isOpen: false,
    },
  ];
}
