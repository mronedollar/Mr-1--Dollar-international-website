import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Award } from "lucide-react";
const AboutUs = () => {
  const values = [{
    icon: <TrendingUp className="h-8 w-8 text-gold" />,
    title: "Financial Independence",
    description: "Empowering individuals with the skills to achieve true financial freedom"
  }, {
    icon: <Users className="h-8 w-8 text-blue" />,
    title: "Community Growth",
    description: "Creating a supportive environment where traders thrive together"
  }, {
    icon: <Target className="h-8 w-8 text-gold" />,
    title: "Top-Notch Training",
    description: "Providing world-class education and valuable trading resources"
  }, {
    icon: <Award className="h-8 w-8 text-blue" />,
    title: "Professional Development",
    description: "Fostering both personal and professional growth in trading"
  }];
  return <section id="about-us" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-6">
              About Mr One Dollar International
            </h2>
            <p className="text-xl text-muted-foreground">
              Designing the blueprint to the 1% of successful traders
            </p>
          </div>

          {/* Main Content */}
          <Card className="mb-12 bg-card border-gold/20 animate-scale-in">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-black" />
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-foreground/90 mb-8 text-center">
                At Mr One Dollar International, our purpose goes beyond just trading. We believe in 
                empowering individuals with the skills and knowledge to achieve financial independence. 
                Our mission is to create a community where traders can thrive, learn, and grow together.
              </p>
              
              <p className="text-lg leading-relaxed text-foreground/90 mb-8 text-center">
                We are dedicated to providing top-notch training, valuable resources, and a supportive 
                environment that fosters personal and professional development.
              </p>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gold-gradient mb-4">Our Mission</h3>
                <p className="text-xl font-semibold text-blue">
                  "The Blueprint to the 1% – Trade Smarter, Profit Bigger!!!"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
            {values.map((value, index) => <Card key={index} className="bg-card border-border hover:border-gold/50 transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-accent to-muted rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-gradient-to-r from-gold/10 to-blue/10 p-8 rounded-2xl border border-gold/20">
              <h3 className="text-2xl font-bold text-gold-gradient mb-4">
                Join the Elite 1% of Traders
              </h3>
              <p className="text-lg text-foreground/90 mb-4">
                Ready to transform your trading journey? Join our exclusive community and learn 
                the strategies that separate successful traders from the rest.
              </p>
              <p className="text-blue font-semibold text-xl">
                Stay Blue & Take Profit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutUs;