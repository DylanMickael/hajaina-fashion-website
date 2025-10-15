"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronLeft, ChevronRight, Handshake } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import SocialButton from "@/components/ui/social-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Login Component
const LoginForm = ({ onError, users }: any) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()


  const handleLogin = (e: any) => {
    e.preventDefault()
    onError("")

    if (!email || !password) {
      onError("Veuillez remplir tous les champs.")
      return
    }

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (user) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", 'creator')
      localStorage.setItem("userEmail", email)
      router.push("/dashboard")
    } else {
      onError("Email ou mot de passe incorrect.")
    }
  }


  return (
    <form onSubmit={handleLogin} className="text-white space-y-6 mt-6">
      <div className="text-white space-y-2">
        <Label htmlFor="loginEmail" className="text-white font-light tracking-wide text-md">
          Email
        </Label>
        <Input
          id="loginEmail"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-white border-gray-800 focus:border-white font-light"
        />
      </div>
      <div className="text-white space-y-2">
        <Label htmlFor="loginPassword" className="text-white font-light tracking-wide text-md">
          Mot de passe
        </Label>
        <Input
          id="loginPassword"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-white border-gray-800 focus:border-white font-light"
        />
      </div>
      <Button
        type="submit"
        className="text-black w-full bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
      >
        Se connecter
      </Button>
      <p className="text-white text-center text-md mt-6 font-light">
        Test : <span className="text-white font-semibold">test@example.com</span> / <span className="text-white font-semibold">password123</span>
      </p>
    </form>
  )
}

// Step 1: Role Selection
const RoleSelectionStep = ({ role, setRole, onNext }: any) => {
  const handleNext = () => {
    if (!role) return
    onNext()
  }

  return (
    <div className="text-white space-y-6">
      <div className="text-white space-y-2">
        <Label className="text-white font-light tracking-wide text-md">Vous êtes : *</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="text-white border-gray-700 w-full">
            <SelectValue placeholder="Sélectionnez votre profil" />
          </SelectTrigger>
          <SelectContent className="text-white border-gray-700 z-10 bg-black/95">
            <SelectItem value="createur">Créateur de mode</SelectItem>
            <SelectItem value="prestataire">Artisant / Prestataire</SelectItem>
            <SelectItem value="organisme">Organisme</SelectItem>
            <SelectItem value="amateur">Amateur de mode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleNext}
        disabled={!role}
        className="text-black w-full bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
      >
        Suivant <ChevronRight className="text-black ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

// Step 2: Personal & Professional Info
const PersonalInfoStep = ({ 
  role, 
  firstName, setFirstName,
  lastName, setLastName,
  companyName, setCompanyName,
  brandName, setBrandName,
  organizationType, setOrganizationType,
  speciality, setSpeciality,
  onNext, onPrev 
}: any) => {
  const handleNext = () => {
    // Basic validation
    if (!firstName || !lastName) return
    
    // Role-specific validation
    if (role === "createur" && !brandName) return
    if ((role === "prestataire" || role === "industrie") && !companyName) return
    if (role === "organisme" && !organizationType) return
    
    onNext()
  }

  const renderRoleFields = () => {
    switch (role) {
      case "createur":
        return (
          <>
            <div className="text-white space-y-2">
              <Label htmlFor="brandName" className="text-white font-light tracking-wide text-md">
                Nom de marque *
              </Label>
              <Input
                id="brandName"
                placeholder="Votre marque"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="text-white border-gray-800 focus:border-white font-light"
              />
            </div>
            <div className="text-white space-y-2">
              <Label htmlFor="speciality" className="text-white font-light tracking-wide text-md">
                Spécialité
              </Label>
              <Select value={speciality} onValueChange={setSpeciality}>
                <SelectTrigger className="text-white border-gray-700 z-10 bg-transparent">
                  <SelectValue placeholder="Votre spécialité" />
                </SelectTrigger>
                <SelectContent className="text-white border-gray-700 z-10 bg-black/95">
                  <SelectItem value="pret-a-porter">Prêt-à-porter</SelectItem>
                  <SelectItem value="haute-couture">Haute couture</SelectItem>
                  <SelectItem value="accessoires">Accessoires</SelectItem>
                  <SelectItem value="chaussures">Chaussures</SelectItem>
                  <SelectItem value="lingerie">Lingerie</SelectItem>
                  <SelectItem value="sport">Vêtements de sport</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      
      case "prestataire":
        return (
          <>
            <div className="text-white space-y-2">
              <Label htmlFor="companyName" className="text-white font-light tracking-wide text-md">
                Nom de l'entreprise *
              </Label>
              <Input
                id="companyName"
                placeholder="Votre entreprise"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-white border-gray-800 focus:border-white font-light"
              />
            </div>
            <div className="text-white space-y-2">
              <Label htmlFor="speciality" className="text-white font-light tracking-wide text-md">
                Type de prestation
              </Label>
              <Select value={speciality} onValueChange={setSpeciality}>
                <SelectTrigger className="text-white border-gray-700 z-10 bg-transparent">
                  <SelectValue placeholder="Votre spécialité" />
                </SelectTrigger>
                <SelectContent className="text-white border-gray-700 z-10 bg-black/95">
                  <SelectItem value="artisanat">Artisanat</SelectItem>
                  <SelectItem value="textile">Matières textiles</SelectItem>
                  <SelectItem value="mannequinat">Mannequinat</SelectItem>
                  <SelectItem value="photographie">Photographie</SelectItem>
                  <SelectItem value="technologie">Technologie mode</SelectItem>
                  <SelectItem value="other">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      
      case "organisme":
        return (
          <div className="text-white space-y-2">
            <Label htmlFor="organizationType" className="text-white font-light tracking-wide text-md">
              Type d'organisme *
            </Label>
            <Select value={organizationType} onValueChange={setOrganizationType}>
              <SelectTrigger className="text-white border-gray-700 z-10 bg-transparent">
                <SelectValue placeholder="Type d'organisme" />
              </SelectTrigger>
              <SelectContent className="text-white border-gray-700 z-10 bg-black/95">
                <SelectItem value="agence">Agence</SelectItem>
                <SelectItem value="association">Association</SelectItem>
                <SelectItem value="syndicat">Syndicat</SelectItem>
                <SelectItem value="federation">Fédération</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      
      case "amateur":
        return (
          <div className="text-white space-y-2">
            <Label htmlFor="speciality" className="text-white font-light tracking-wide text-md">
              Centres d'intérêt
            </Label>
            <Select value={speciality} onValueChange={setSpeciality}>
              <SelectTrigger className="text-white border-gray-700 z-10 bg-transparent">
                <SelectValue placeholder="Vos intérêts mode" />
              </SelectTrigger>
              <SelectContent className="text-white border-gray-700 z-10 bg-black/95">
                <SelectItem value="tendances">Tendances mode</SelectItem>
                <SelectItem value="vintage">Mode vintage</SelectItem>
                <SelectItem value="luxe">Mode de luxe</SelectItem>
                <SelectItem value="streetwear">Streetwear</SelectItem>
                <SelectItem value="durable">Mode durable</SelectItem>
                <SelectItem value="defiles">Défilés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      
      default:
        return null
    }
  }

  const isValid = () => {
    if (!firstName || !lastName) return false
    if (role === "createur" && !brandName) return false
    if ((role === "prestataire" || role === "industrie") && !companyName) return false
    if (role === "organisme" && !organizationType) return false
    return true
  }

  return (
    <div className="text-white space-y-6">
      <div className="text-white grid grid-cols-2 gap-4">
        <div className="text-white space-y-2">
          <Label htmlFor="firstName" className="text-white font-light tracking-wide text-md">
            Prénom *
          </Label>
          <Input
            id="firstName"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>
        <div className="text-white space-y-2">
          <Label htmlFor="lastName" className="text-white font-light tracking-wide text-md">
            Nom *
          </Label>
          <Input
            id="lastName"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>
      </div>

      {renderRoleFields()}

      <div className="text-white flex gap-3">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
        >
          <ChevronLeft className="text-black mr-2 h-4 w-4" /> Précédent
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid()}
          className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
        >
          Suivant <ChevronRight className="text-black ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Step 3: Account Creation
const AccountCreationStep = ({ 
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  onSubmit, onPrev, isLoading 
}: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(e)
  }

  const isValid = () => {
    return email && password && confirmPassword && password === confirmPassword
  }

  return (
    <div className="text-white space-y-6">
      <form onSubmit={handleSubmit} className="text-white space-y-4">
        <div className="text-white space-y-2">
          <Label htmlFor="signupEmail" className="text-white font-light tracking-wide text-md">
            Email *
          </Label>
          <Input
            id="signupEmail"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white space-y-2">
          <Label htmlFor="signupPassword" className="text-white font-light tracking-wide text-md">
            Mot de passe *
          </Label>
          <Input
            id="signupPassword"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white space-y-2">
          <Label htmlFor="confirmPassword" className="text-white font-light tracking-wide text-md">
            Confirmer le mot de passe *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-white border-gray-800 focus:border-white font-light"
          />
        </div>

        <div className="text-white flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3"
          >
            <ChevronLeft className="text-black mr-2 h-4 w-4" /> Précédent
          </Button>
          <Button
            type="submit"
            disabled={!isValid() || isLoading}
            className="text-black flex-1 bg-white/95 hover:bg-gray-200 font-light tracking-[0.1em] uppercase py-3 disabled:bg-gray-200"
          >
            {isLoading ? "Création..." : "Créer le compte"}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: any) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-10 w-full">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
              i + 1 <= currentStep
                ? 'bg-white/95 text-black shadow-lg'
                : 'bg-gray-400 text-gray-500'
            }`}
          >
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`w-32 h-0.5 mx-2 transition-all duration-300 ${
                i + 1 < currentStep ? 'bg-white/95 text-black' : 'bg-gray-400'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
// Multi-step Signup Component
const SignupForm = ({ onError, onSignup }: any) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [organizationType, setOrganizationType] = useState("")
  const [speciality, setSpeciality] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onError("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      onError("Les mots de passe ne correspondent pas.")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSignup({
        email,
        password,
        role,
      })
    }, 2000)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="text-white mt-6">
      {/* <StepIndicator currentStep={currentStep} totalSteps={3}/> */}

      {currentStep === 1 && (
        <RoleSelectionStep
          role={role}
          setRole={setRole}
          onNext={nextStep}
        />
      )}

      {currentStep === 2 && (
        <PersonalInfoStep
          role={role}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          companyName={companyName}
          setCompanyName={setCompanyName}
          brandName={brandName}
          setBrandName={setBrandName}
          organizationType={organizationType}
          setOrganizationType={setOrganizationType}
          speciality={speciality}
          setSpeciality={setSpeciality}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {currentStep === 3 && (
        <AccountCreationStep
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSubmit}
          onPrev={prevStep}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

// Main Authentication Component
export default function Authentication() {
  const [error, setError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // State pour les users
  const [users, setUsers] = useState([
    {
      email: "test@example.com",
      password: "password123",
      role: "creator",
    },
  ])

  // Ajout d'un nouvel utilisateur
  const handleSignup = (newUser: any) => {
    if (users.some((u) => u.email === newUser.email)) {
      setError("Cet email est déjà utilisé.")
      return
    }
    setUsers((prev) => [...prev, newUser])
    setError("")
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 5000)
  }

  return (
    <div className="text-white min-h-screen bg-gradient-to-r from-black/90 to-black">
      {/* Background Pattern */}
      <div className="text-white relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-white/95 relative overflow-hidden">
          {/* Animated Background Elements */}
          <Image
            src="/img/login2.png"
            alt="Login Fashion"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="relative text-white flex flex-col md:h-screen overflow-y-scroll md:py-14 items-center justify-between">
          {showSuccessAlert && (
            <Alert className="fixed mx-5 bottom-6 md:right-0 max-w-fit bg-gray-800 shadow-lg shadow-black border-0 animate-fade-in duration-75 z-10">
              <AlertTitle>Inscription réussie ! ✨</AlertTitle>
              <AlertDescription>
                Vous pouvez maintenant vous connecter.
              </AlertDescription>
            </Alert>
          )}
          <Link className="text-white mt-20 absolute -top-14 md:-top-1 left-0" href="/">
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 focus:ring-gray-700"
            >
              <ArrowLeft className="text-white h-20 w-20" />
            </Button>
          </Link>
          <div className="text-white w-full max-w-lg">
            <Card className="text-white border-0 bg-transparent overflow-hidden pt-2 md:pt-1">
              <CardHeader className="text-white text-center pb-2">
                <div className="w-full flex justify-center pb-5">
                  <Link href="/" className="text-2xl font-light tracking-[0.2em] serif-font z-10">
                    <Handshake size={32} color="white" />
                  </Link>
                </div>
                <CardTitle className="text-white text-4xl md:text-4xl font-extralight tracking-[0.2em] font-serif">
                  Rejoignez-nous
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white px-12 py-2">
                <Tabs defaultValue="login" className="text-white w-full">
                  <TabsList className="text-white grid w-full grid-cols-2 p-1 mb-8">
                    <TabsTrigger 
                      value="login" 
                      className="
                      text-white font-2xl font-extralight tracking-[0.2em] py-5 data-[state=active]:border-b data-[state=active]:border-white/80 transition-all duration-200"
                    >
                      CONNEXION
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="text-white font-5xl font-extralight tracking-[0.2em] py-5 data-[state=active]:border-b data-[state=active]:border-white/80 transition-all duration-200"
                    >
                      INSCRIPTION
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="text-white my-16">
                    <LoginForm onError={setError} users={users} />
                  </TabsContent>
                  
                  <TabsContent value="signup" className="text-white my-16">
                    <SignupForm onError={setError} onSignup={handleSignup} />
                  </TabsContent>
                </Tabs>
                
                {error && (
                  <div className="text-white mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm text-center font-lg">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        
          <div className="space-x-10 mb-6">
            <SocialButton provider="facebook" variant="login" onClick={()=>{}}/>
            <SocialButton provider="google" variant="login" onClick={()=>{}} />
            <SocialButton provider="other" variant="login" onClick={()=>{}} />
          </div>

        </div>
      </div>

      {/* Floating Elements for Mobile */}
      <div className="text-white lg:hidden fixed inset-0 pointer-events-none overflow-hidden">
        <div className="text-white absolute top-1/4 right-4 w-16 h-16 bg-gray-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="text-white absolute bottom-1/4 left-4 w-12 h-12 bg-gray-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}