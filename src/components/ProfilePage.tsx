import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';
import { useUserProfile } from './hooks/useLiveData';
import { authApi, consumerApi } from '../utils/api';
import { toast } from 'sonner@2.0.3';
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
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface ProfilePageProps {
  onPageChange: (page: string) => void;
}

export function ProfilePage({ onPageChange }: ProfilePageProps) {
  const { t, language } = useLanguage();
  const { profile: userProfile, consumers, loading: dataLoading, error: dataError, refetch } = useUserProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingConsumer, setIsAddingConsumer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  
  const [newConsumerNumber, setNewConsumerNumber] = useState('');
  const [newConsumerName, setNewConsumerName] = useState('');
  const [newConsumerAddress, setNewConsumerAddress] = useState('');
  const [newConsumerCategory, setNewConsumerCategory] = useState('Residential');
  
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  // Initialize edited values when profile loads
  useEffect(() => {
    if (userProfile) {
      setEditedName(userProfile.name || '');
      setEditedPhone(userProfile.phone || '');
    }
  }, [userProfile]);

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const response = await authApi.updateProfile(editedName, editedPhone);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        refetch();
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update profile error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddConsumer = async () => {
    if (!newConsumerNumber.trim()) {
      toast.error('Consumer number is required');
      return;
    }
    
    if (!newConsumerName.trim() || !newConsumerAddress.trim()) {
      toast.error('Name and address are required');
      return;
    }

    setIsSaving(true);
    try {
      const response = await consumerApi.addConsumer(
        newConsumerNumber.trim(),
        newConsumerName.trim(),
        newConsumerAddress.trim(),
        newConsumerCategory
      );
      
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Consumer added successfully');
        setNewConsumerNumber('');
        setNewConsumerName('');
        setNewConsumerAddress('');
        setNewConsumerCategory('Residential');
        setIsAddingConsumer(false);
        refetch();
      }
    } catch (error) {
      toast.error('Failed to add consumer');
      console.error('Add consumer error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveConsumer = async (consumerNumber: string) => {
    if (consumers.length === 1) {
      toast.error('Cannot remove your only consumer');
      return;
    }

    if (!confirm(`Are you sure you want to remove consumer ${consumerNumber}?`)) {
      return;
    }

    setIsRemoving(consumerNumber);
    try {
      const response = await consumerApi.removeConsumer(consumerNumber);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Consumer removed successfully');
        refetch();
      }
    } catch (error) {
      toast.error('Failed to remove consumer');
      console.error('Remove consumer error:', error);
    } finally {
      setIsRemoving(null);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (dataError || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{dataError || 'Failed to load profile'}</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

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
                    <Button size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      {t.save}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setIsEditing(false);
                      setEditedName(userProfile.name || '');
                      setEditedPhone(userProfile.phone || '');
                    }}>
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
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
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
                      value={userProfile.email || ''}
                      disabled
                      className="pl-10 bg-muted/50"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="+91 XXXXXXXXXX"
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
                  {consumers.length}
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
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Consumer Number (e.g., MH123456789)"
                      value={newConsumerNumber}
                      onChange={(e) => setNewConsumerNumber(e.target.value)}
                    />
                    <Input
                      placeholder="Name"
                      value={newConsumerName}
                      onChange={(e) => setNewConsumerName(e.target.value)}
                    />
                    <Input
                      placeholder="Address"
                      value={newConsumerAddress}
                      onChange={(e) => setNewConsumerAddress(e.target.value)}
                      className="sm:col-span-2"
                    />
                    <select
                      value={newConsumerCategory}
                      onChange={(e) => setNewConsumerCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddConsumer} 
                      disabled={isSaving || !newConsumerNumber.trim() || !newConsumerName.trim()}
                      className="flex-1"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                      Add Consumer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsAddingConsumer(false);
                        setNewConsumerNumber('');
                        setNewConsumerName('');
                        setNewConsumerAddress('');
                        setNewConsumerCategory('Residential');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consumers.map((consumer, index) => {
              const isRemoving_ = isRemoving === consumer.consumerNumber;
              
              return (
                <Card key={index} className="transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-semibold break-all">{consumer.consumerNumber}</span>
                          <Badge variant="outline" className="text-xs">
                            {consumer.category || 'Residential'}
                          </Badge>
                          {consumer.status && (
                            <Badge variant="default" className="text-xs">
                              {consumer.status}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="break-words">{consumer.name}</div>
                          <div className="break-words">{consumer.address}</div>
                          {consumer.currentBill && (
                            <div className="flex gap-4 flex-wrap">
                              <span>Due: ₹{consumer.currentBill.amount}</span>
                              <span>Units: {consumer.currentBill.unitsConsumed}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveConsumer(consumer.consumerNumber)}
                        disabled={consumers.length === 1 || isRemoving_}
                        className="shrink-0"
                      >
                        {isRemoving_ ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {consumers.length === 0 && !isAddingConsumer && (
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
