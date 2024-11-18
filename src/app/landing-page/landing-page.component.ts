import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  showLogin = false;
  showSignup = false;
  isMobileMenuOpen = false;
  activeSection = 'hero';
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Update navbar background on scroll
    this.isScrolled = window.scrollY > 50;
    // Update active section
    this.updateActiveSection();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top;
      // Get the current scroll position
      const startPosition = window.pageYOffset;
      // Calculate the target position (accounting for navbar)
      const navbarHeight = 80;
      const targetPosition = startPosition + elementPosition - navbarHeight;
      
      // Smooth scroll animation
      this.smoothScrollTo(targetPosition, 1200); // 1.2 seconds duration
      
      // Close mobile menu if open
      this.isMobileMenuOpen = false;
    }
  }
  private smoothScrollTo(targetPosition: number, duration: number) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
  
    function easeInOutCubic(t: number): number {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    } 
    
    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
  
      window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
  
    requestAnimationFrame(animation);
  
  }

  updateActiveSection() {
    const sections = ['hero', 'features', 'stats', 'cta', 'contact'];
    const navbarHeight = 80;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  // Modal handling
  openLogin() {
    this.showLogin = true;
    this.showSignup = false;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  openSignup() {
    this.showSignup = true;
    this.showLogin = false;
    document.body.style.overflow = 'hidden';
  }

  closeModals() {
    this.showLogin = false;
    this.showSignup = false;
  } 
  

  // Mobile menu handling
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Handle escape key for modals
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModals();
    this.isMobileMenuOpen = false;
  }

  // Handle click outside modals
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      this.closeModals();
    }
  }

  // Navigation helpers
  learnMore() {
    this.scrollToSection('features');
  }

  // Social sharing methods (optional)
  shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out EventMaster - The ultimate event management platform!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('EventMaster - Event Management Platform');
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
  }

  // Prevent modal close when clicking inside
  preventModalClose(event: MouseEvent) {
    event.stopPropagation();
  }

  // Optional: Scroll to top button
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Optional: Check if element is in viewport
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
