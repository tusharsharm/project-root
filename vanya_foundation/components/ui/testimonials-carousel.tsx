'use client';

import { useState } from 'react';
import { Card } from './card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="p-6">
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" 
                />
              )}
              <blockquote className="text-gray-600 italic mb-4">{testimonial.content}</blockquote>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}