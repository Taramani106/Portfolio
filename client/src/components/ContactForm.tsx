import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Loader2, Send, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const sendEmail = useMutation({
    mutationFn: (data: FormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: 'Thank you for contacting me. I will get back to you as soon as possible.',
      });
      form.reset();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    }
  });

  function onSubmit(data: FormData) {
    sendEmail.mutate(data);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Get in touch</CardTitle>
        <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-success mb-4" />
              <h3 className="text-xl font-bold text-center">Message Sent Successfully!</h3>
              <p className="text-muted-foreground text-center mt-2">
                Thank you for reaching out. I'll respond to your message soon.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => setSubmitSuccess(false)}
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            className="min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={sendEmail.isPending}
                  >
                    {sendEmail.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          You can also reach me directly at <a href="mailto:taramani@example.com" className="text-primary hover:underline">taramani@example.com</a>
        </p>
      </CardFooter>
    </Card>
  );
}
