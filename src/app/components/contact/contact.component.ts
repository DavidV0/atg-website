import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting: boolean = false;
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')],
      ],
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
      });
    }
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.contactForm.value;

      emailjs
        .send(
          'service_skwyujm',
          'template_0aey4bh',
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            phone: formData.phone,
            to_name: 'Alpha Technology Group Team',
          },
          'y0ctdh78lk2QVv9n0'
        )
        .then(() => {
          this.successMessage = 'Message sent successfully!';
          this.contactForm.reset();
          setTimeout(() => {
            this.successMessage = null;
            this.isSubmitting = false;
          }, 3000);
        })
        .catch(() => {
          this.errorMessage = 'Failed to send message. Please try again later.';
          setTimeout(() => {
            this.errorMessage = null;
            this.isSubmitting = false;
          }, 3000);
        });
    }
  }
}
