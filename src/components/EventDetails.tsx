import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Gift, TrendingUp, ExternalLink } from "lucide-react";

const EventDetails = () => {
  const highlights = [
    "Free entry with early registration",
    "Forex, crypto & global market insights", 
    "Lucky draws & exciting giveaways",
    "Networking with traders & pros"
  ];

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      title: "Expert Seminars",
      description: "Learn from industry leaders and trading professionals"
    },
    {
      icon: <Users className="h-8 w-8 text-blue" />,
      title: "Live Workshops", 
      description: "Hands-on trading sessions and strategy demonstrations"
    },
    {
      icon: <Gift className="h-8 w-8 text-gold" />,
      title: "Live Demos",
      description: "See the latest trading tools and platforms in action"
    }
  ];

  return (
    <section id="event-details" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-gradient mb-6">
            📢 Traders Fair South Africa 2025 🇿🇦
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join traders, investors, and fintech innovators for a full day of free seminars, 
            workshops, and live demos. Learn from industry experts, explore the latest trading 
            tools, and connect with like-minded people from across the region.
          </p>
        </div>

        {/* Event Info Card */}
        <Card className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-card via-card to-accent/10 border-gold/20 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gold-gradient mb-4">Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center md:justify-start gap-4 text-xl">
                <Calendar className="h-8 w-8 text-blue" />
                <div>
                  <p className="font-semibold text-foreground">📅 Date</p>
                  <p className="text-blue font-bold">20 September 2025</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 text-xl">
                <MapPin className="h-8 w-8 text-gold" />
                <div>
                  <p className="font-semibold text-foreground">📍 Location</p>
                  <p className="text-gold font-bold">Protea by Marriott Hotel</p>
                  <p className="text-muted-foreground text-sm">Wanderers, Sandton</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                className="btn-blue text-lg px-8 py-4"
                onClick={() => window.open('https://tradersfair.com/africa/', '_blank')}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Register Now - Free Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-gold/50 transition-all duration-300 group hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-accent to-muted rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights */}
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-gold/5 to-blue/5 border-gold/30 animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gold-gradient">Event Highlights</CardTitle>
            <CardDescription>What you'll experience at Traders Fair 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <div className="w-6 h-6 bg-gradient-to-r from-gold to-gold-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-blue/10 to-gold/10 p-8 rounded-2xl max-w-2xl mx-auto border border-gold/20">
            <p className="text-lg font-semibold text-gold mb-4">
              🎯 Complete the broker signup and event registration to join our Telegram group!
            </p>
            <p className="text-muted-foreground">
              Get exclusive trade ideas, market insights, and connect with successful traders 
              for one month absolutely free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;