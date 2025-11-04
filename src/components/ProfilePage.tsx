import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';
import { mockUserProfile, mockConsumers } from './mockData';
import { 
  User, 
  Mail, 
  Phone, 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  ArrowLeft
} from 'lucide-react';

interface ProfilePageProps {
  onPageChange: (page: string) => void;
}

export function ProfilePage({ onPageChange }: ProfilePageProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingConsumer, setIsAddingConsumer] = useState(false);
  const [newConsumerNumber, setNewConsumerNumber] = useState('');
  const [profile, setProfile] = useState(mockUserProfile);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const handleAddConsumer = () => {
    if (newConsumerNumber.trim()) {
      setProfile(prev => ({
        ...prev,
        consumerNumbers: [...prev.consumerNumbers, newConsumerNumber.trim()]
      }));
      setNewConsumerNumber('');
      setIsAddingConsumer(false);
    }
  };

  const handleRemoveConsumer = (consumerNumber: string) => {
    setProfile(prev => ({
      ...prev,
      consumerNumbers: prev.consumerNumbers.filter(num => num !== consumerNumber),
      defaultConsumer: prev.defaultConsumer === consumerNumber 
        ? prev.consumerNumbers.find(num => num !== consumerNumber) || ''
        : prev.defaultConsumer
    }));
  };

  const handleSetDefault = (consumerNumber: string) => {
    setProfile(prev => ({
      ...prev,
      defaultConsumer: consumerNumber
    }));
  };

  const getConsumerDetails = (consumerNumber: string) => {
    return mockConsumers.find(c => c.consumerNumber === consumerNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-3 sm:p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.profile}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your account settings</p>
          </div>
          <Button variant="outline" onClick={() => onPageChange('dashboard')} className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Personal Information */}
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t.personalInfo}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Your account information and contact details
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                    <Edit className="w-4 h-4 mr-2" />
                    {t.edit}
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      {t.save}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {profile.consumerNumbers.length}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Linked Consumers</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  Active
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Account Status</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consumer Numbers */}
        <Card className="mt-4 sm:mt-6 glass-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-base sm:text-lg">{t.savedConsumers}</CardTitle>
                <CardDescription className="text-sm">
                  Manage your electricity consumer numbers
                </CardDescription>
              </div>
              {!isAddingConsumer && (
                <Button onClick={() => setIsAddingConsumer(true)} className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addConsumer}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isAddingConsumer && (
              <Card className="border-2 border-dashed border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter consumer number (e.g., MH123456789)"
                      value={newConsumerNumber}
                      onChange={(e) => setNewConsumerNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddConsumer} disabled={!newConsumerNumber.trim()}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setIsAddingConsumer(false);
                      setNewConsumerNumber('');
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.consumerNumbers.map((consumerNumber, index) => {
              const consumerDetails = getConsumerDetails(consumerNumber);
              const isDefault = consumerNumber === profile.defaultConsumer;
              
              return (
                <Card key={index} className={`transition-all ${isDefault ? 'ring-2 ring-primary/50' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{consumerNumber}</span>
                          {isDefault && (
                            <Badge variant="default" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        
                        {consumerDetails && (
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>{consumerDetails.name}</div>
                            <div>{consumerDetails.address}</div>
                            <div className="flex gap-4">
                              <span>Due: ₹{consumerDetails.dueAmount}</span>
                              <span>Type: {consumerDetails.tariffType}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {!isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefault(consumerNumber)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveConsumer(consumerNumber)}
                          disabled={profile.consumerNumbers.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {profile.consumerNumbers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No consumer numbers added yet</p>
                <p className="text-sm">Add your first consumer number to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}