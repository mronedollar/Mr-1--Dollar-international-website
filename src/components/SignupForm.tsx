import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, User, Sparkles, Copy, ExternalLink, Shield, Zap } from "lucide-react";
import AutomatedStepFlow from "./AutomatedStepFlow";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [completedSteps, setCompletedSteps] = useState([false, false]);
  const { toast } = useToast();

  const handleStepComplete = (step: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[step - 1] = true;
    setCompletedSteps(newCompletedSteps);
    
    toast({
      title: `Step ${step} Completed!`,
      description: step === 1 ? "Broker account opened successfully" : "Event registration successful",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and email address.",
        variant: "destructive",
      });
      return;
    }

    if (!confirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that you've completed both steps above.",
        variant: "destructive",
      });
      return;
    }

    // Generate a unique access code (in real implementation, this would come from backend)
    const code = `TF2025_${Date.now().toString().slice(-6)}`;
    setAccessCode(code);
    setIsSubmitted(true);

    toast({
      title: "Success!",
      description: "Your access code has been generated. Check the details below.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Access code copied to clipboard",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
              🎉 Access Code Generated!
            </h2>
          </div>
          
          <Card className="premium-card max-w-4xl mx-auto animate-scale-in">
            <CardHeader className="text-center pb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center mx-auto mb-6 animate-float shadow-[var(--shadow-gold)]">
                <Sparkles className="h-12 w-12 text-black" />
              </div>
              <CardTitle className="text-5xl text-gold-gradient mb-4 animate-glow">
                Success, {name}!
              </CardTitle>
              <CardDescription className="text-2xl text-muted-foreground">
                Your exclusive Telegram access code is ready
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-10 p-8">
              {/* Access Code Display */}
              <div className="bg-gradient-to-br from-gold/15 to-gold/5 border-4 border-gold/40 rounded-3xl p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Shield className="h-8 w-8 text-gold" />
                    <p className="text-2xl font-bold text-gold">Your Unique Access Code</p>
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-gold/30">
                    <code className="text-4xl md:text-5xl font-mono font-bold text-gold tracking-widest block mb-4 text-glow-gold">
                      {accessCode}
                    </code>
                    <Button
                      className="btn-outline-gold"
                      onClick={() => copyToClipboard(accessCode)}
                    >
                      <Copy className="mr-2 h-5 w-5" />
                      Copy Code
                    </Button>
                  </div>
                  <p className="text-lg text-gold/80 font-semibold">
                    ⚡ Save this code - you'll need it for Telegram
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-br from-blue/10 to-blue/5 border border-blue/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-blue mb-6 flex items-center gap-3">
                  <ExternalLink className="h-6 w-6" />
                  How to Join Our Telegram Group
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-background/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-blue mb-1">Open Telegram</p>
                      <p className="text-sm text-muted-foreground">Search for <code className="bg-muted px-2 py-1 rounded text-gold">@InviteMemberBot</code> and start a chat</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-background/30 rounded-lg">
                    <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-blue mb-1">Send Your Code</p>
                      <p className="text-sm text-muted-foreground">Message the bot with your access code: <code className="bg-muted px-2 py-1 rounded text-gold">{accessCode}</code></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-background/30 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-green-500 mb-1">Get Instant Access</p>
                      <p className="text-sm text-muted-foreground">You'll be automatically added to our exclusive trade ideas group for <span className="text-gold font-semibold">1 full month</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">!</span>
                  </div>
                  <h4 className="font-bold text-red-500">Important Security Notice</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your access code is unique and for your personal use only. Sharing your code will result in 
                  immediate removal from the group. Each code can only be used once.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-blue flex-1"
                  onClick={() => window.open('https://t.me/InviteMemberBot', '_blank')}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Telegram Bot
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-gold/50 text-gold hover:bg-gold hover:text-black"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName("");
                    setEmail("");
                    setConfirmed(false);
                    setAccessCode("");
                  }}
                >
                  Generate Another Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-20">
      {/* Steps Section */}
      <section id="steps" className="py-20 hero-bg">
        <div className="container mx-auto px-4">
          <AutomatedStepFlow 
            onStepComplete={handleStepComplete}
            completedSteps={completedSteps}
          />
        </div>
      </section>

      {/* Form Section */}
      <section id="signup" className="py-20 bg-gradient-to-br from-background to-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Zap className="h-8 w-8 text-gold" />
                <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient">
                  Get Your Access Code
                </h2>
                <Zap className="h-8 w-8 text-gold" />
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                You're just one step away from joining our exclusive trading community
              </p>
            </div>

            <Card className="premium-card">
              <CardHeader className="text-center pb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[var(--shadow-gold)]">
                  <Sparkles className="h-10 w-10 text-black" />
                </div>
                <CardTitle className="text-4xl text-gold-gradient mb-4">
                  Join Our Elite Trading Community
                </CardTitle>
                <CardDescription className="text-xl text-muted-foreground">
                  Get 1 month of premium trade ideas, market analysis, and exclusive insights
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="name" className="text-gold font-bold text-xl">
                        Full Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-6 top-6 h-6 w-6 text-gold/60" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-16 h-16 bg-background/60 border-2 border-border focus:border-gold text-xl rounded-2xl font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="email" className="text-gold font-bold text-xl">
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-6 h-6 w-6 text-gold/60" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-16 h-16 bg-background/60 border-2 border-border focus:border-gold text-xl rounded-2xl font-semibold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="bg-gradient-to-br from-green/15 to-green/5 border-2 border-green/40 rounded-3xl p-8">
                    <div className="flex items-start space-x-6">
                      <Checkbox
                        id="confirmed"
                        checked={completedSteps.every(Boolean)}
                        onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                        className="mt-2 w-6 h-6 border-2 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-black"
                        disabled={!completedSteps.every(Boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="confirmed" className="text-xl cursor-pointer font-bold text-green">
                          ✅ Both steps completed successfully
                        </Label>
                        <p className="text-lg text-muted-foreground mt-3">
                          {completedSteps.every(Boolean) 
                            ? "Great! You've completed both the broker signup and event registration." 
                            : "Please complete both steps above before proceeding."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="btn-gold w-full text-2xl py-8 h-20 font-bold rounded-3xl shadow-2xl"
                    disabled={!name || !email || !completedSteps.every(Boolean)}
                  >
                    <Sparkles className="mr-4 h-8 w-8" />
                    Generate My Access Code
                    <Sparkles className="ml-4 h-8 w-8" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Section */}
            <div className="mt-16 text-center premium-card p-8">
              <Shield className="h-12 w-12 text-gold mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gold mb-4">Need Assistance?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our support team is here to help with any questions about the registration process
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <a 
                  href="mailto:info@mr1dollar.co.za" 
                  className="flex items-center gap-3 text-gold hover:text-gold-light transition-colors text-lg font-semibold"
                >
                  <Mail className="h-6 w-6" />
                  info@mr1dollar.co.za
                </a>
                <div className="hidden sm:block h-8 w-px bg-border"></div>
                <p className="text-muted-foreground">
                  Response time: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;