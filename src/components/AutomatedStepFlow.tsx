import { useState, useEffect } from "react";
import { CheckCircle, Circle, ArrowRight, ExternalLink, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StepFlowProps {
  onStepComplete: (step: number) => void;
  completedSteps: boolean[];
}

const AutomatedStepFlow = ({ onStepComplete, completedSteps }: StepFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progressValue, setProgressValue] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Open Broker Account",
      subtitle: "Sign up with PrimeXBT",
      description: "Create your trading account with our recommended broker",
      icon: "M1$",
      iconBg: "from-gold to-gold-dark",
      iconText: "text-black",
      color: "gold",
      url: "https://go.primexbt.direct/visit/?bta=43394&brand=primexbt",
      duration: "2-3 minutes",
      benefit: "Professional trading platform"
    },
    {
      id: 2,
      title: "Register for Event",
      subtitle: "Traders Fair SA 2025",
      description: "Secure your spot at the biggest trading event in Africa",
      icon: "TF",
      iconBg: "from-blue to-blue-dark",
      iconText: "text-white",
      color: "blue",
      url: "https://tradersfair.com/africa/",
      duration: "1-2 minutes",
      benefit: "Free entry & networking"
    }
  ];

  useEffect(() => {
    const completedCount = completedSteps.filter(Boolean).length;
    setProgressValue((completedCount / steps.length) * 100);
    
    if (completedCount > 0) {
      setCurrentStep(completedCount + 1);
    }
  }, [completedSteps, steps.length]);

  const handleStepClick = (stepId: number, url: string) => {
    window.open(url, '_blank');
    onStepComplete(stepId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Progress Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-black">M1$</span>
          </div>
          <div className="text-2xl font-bold text-gold">×</div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue to-blue-dark rounded-xl flex items-center justify-center">
            <span className="text-sm font-bold text-white">TF</span>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
          Complete 2 Simple Steps
        </h2>
        
        <div className="max-w-md mx-auto mb-6">
          <Progress 
            value={progressValue} 
            className="h-3 bg-muted"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {completedSteps.filter(Boolean).length} of {steps.length} steps completed
          </p>
        </div>
      </div>

      {/* Automated Step Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {steps.map((step) => {
          const isCompleted = completedSteps[step.id - 1];
          const isCurrent = currentStep === step.id && !isCompleted;
          const colorClasses = step.color === 'gold' 
            ? 'border-gold/30 hover:border-gold/60 bg-gradient-to-br from-gold/5 to-gold/10' 
            : 'border-blue/30 hover:border-blue/60 bg-gradient-to-br from-blue/5 to-blue/10';
          
          return (
            <div
              key={step.id}
              className={`
                step-card relative group cursor-pointer
                ${colorClasses}
                ${isCurrent ? 'step-card-active ring-2 ring-gold/20' : ''}
                ${isCompleted ? 'border-green/50 bg-gradient-to-br from-green/10 to-green/5' : ''}
              `}
              onClick={() => !isCompleted && handleStepClick(step.id, step.url)}
            >
              {/* Step Number Badge */}
              <div className={`
                absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                transition-all duration-500 group-hover:scale-110
                ${isCompleted 
                  ? 'bg-green text-white' 
                  : step.color === 'gold'
                    ? 'bg-gold text-black'
                    : 'bg-blue text-white'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  step.id
                )}
              </div>

              {/* Status Indicator */}
              {isCurrent && !isCompleted && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  <Zap className="h-4 w-4" />
                  Next Step
                </div>
              )}

              {isCompleted && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green/20 text-green px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </div>
              )}

              {/* Content */}
              <div className="pt-6">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <div className={`
                    w-16 h-16 bg-gradient-to-br ${step.iconBg} rounded-2xl 
                    flex items-center justify-center transition-all duration-300
                    group-hover:scale-110 shadow-lg
                  `}>
                    <span className={`text-xl font-bold ${step.iconText}`}>
                      {step.icon}
                    </span>
                  </div>
                </div>

                {/* Step Info */}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    step.color === 'gold' ? 'text-gold' : 'text-blue'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-lg font-semibold text-foreground/90 mb-2">
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  
                  {/* Duration & Benefit */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Takes {step.duration}
                    </div>
                    <div className={`text-sm font-semibold ${
                      step.color === 'gold' ? 'text-gold' : 'text-blue'
                    }`}>
                      {step.benefit}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className={`
                    w-full text-lg py-6 transition-all duration-300 group-hover:scale-105
                    ${step.color === 'gold' ? 'btn-gold' : 'btn-blue'}
                    ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  disabled={isCompleted}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Completed
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-5 w-5" />
                      {step.id === 1 ? 'Open Account' : 'Register Now'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Success State */}
      {completedSteps.every(Boolean) && (
        <div className="premium-card p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green to-green-light rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-green mb-4">
            🎉 Excellent! Both Steps Completed
          </h3>
          <p className="text-xl text-muted-foreground mb-6">
            You're now ready to get your exclusive Telegram access code below
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-blue mx-auto rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default AutomatedStepFlow;