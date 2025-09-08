import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-gold" />,
      title: "Office Address",
      details: ["13 Fredman Drive", "Fredman Towers, Sandton", "South Africa"],
      link: "https://goo.gl/maps/sandton"
    },
    {
      icon: <Phone className="h-6 w-6 text-blue" />,
      title: "Phone Numbers",
      details: ["+27 626 898 567", "+27 614 267 355"],
      link: "tel:+27626898567"
    },
    {
      icon: <Mail className="h-6 w-6 text-gold" />,
      title: "Email Address", 
      details: ["info@mr1dollar.co.za"],
      link: "mailto:info@mr1dollar.co.za"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Get in touch with the Mr One Dollar International team
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
            {contactInfo.map((contact, index) => (
              <Card 
                key={index}
                className="bg-card border-border hover:border-gold/50 transition-all duration-300 group hover:scale-105 cursor-pointer"
                onClick={() => window.open(contact.link, '_blank')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-accent to-muted rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {contact.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground hover:text-gold transition-colors">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Hours & Additional Info */}
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <Card className="bg-gradient-to-br from-gold/5 to-transparent border-gold/30">
              <CardHeader>
                <CardTitle className="text-2xl text-gold-gradient text-center">
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-foreground">Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-foreground">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue/5 to-transparent border-blue/30">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-gradient text-center">
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-foreground/90">
                    Need immediate assistance with the Traders Fair registration or Telegram access?
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">WhatsApp Support:</p>
                    <a 
                      href="https://wa.me/27626898567" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card className="mt-12 animate-scale-in">
            <CardContent className="p-0">
              <div className="h-64 bg-gradient-to-br from-muted to-accent rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                  <p className="text-lg text-foreground font-semibold">Our Location</p>
                  <p className="text-muted-foreground">Fredman Towers, Sandton</p>
                  <p className="text-sm text-blue mt-2 cursor-pointer hover:underline"
                     onClick={() => window.open('https://goo.gl/maps/sandton', '_blank')}>
                    View on Google Maps →
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;