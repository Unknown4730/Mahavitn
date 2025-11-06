import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';
import { mockUserProfile, mockConsumers } from './mockData';
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
  
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingConsumer, setIsAddingConsumer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  
  const [newConsumerNumber, setNewConsumerNumber] = useState('');
  const [newConsumerName, setNewConsumerName] = useState('');
  const [newConsumerAddress, setNewConsumerAddress] = useState('');
  const [newConsumerCategory, setNewConsumerCategory] = useState('Residential');
  
  // Use mock data
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [consumers, setConsumers] = useState(mockConsumers);
  
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedPhone, setEditedPhone] = useState(userProfile.phone);

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setUserProfile({ ...userProfile, name: editedName, phone: editedPhone });
      toast.success('Profile updated successfully');
      setIsEditing(false);
      setIsSaving(false);
    }, 500);
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
    // Simulate API call
    setTimeout(() => {
      toast.success('Consumer added successfully');
      setNewConsumerNumber('');
      setNewConsumerName('');
      setNewConsumerAddress('');
      setNewConsumerCategory('Residential');
      setIsAddingConsumer(false);
      setIsSaving(false);
    }, 500);
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
    // Simulate API call
    setTimeout(() => {
      setConsumers(consumers.filter(c => c.consumerNumber !== consumerNumber));
      toast.success('Consumer removed successfully');
      setIsRemoving(null);
    }, 500);
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
                    <Button size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      {t.save}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setIsEditing(false);
                      setEditedName(userProfile.name);
                      setEditedPhone(userProfile.phone);
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
                      value={userProfile.email}
                      disabled
                      className="pl-10 bg-muted/50"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Consumers</span>
                  <Badge variant="secondary">{consumers.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consumer Numbers */}
        <Card className="mt-6 glass-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.consumerNumbers}
                </CardTitle>
                <CardDescription className="text-sm">
                  Manage your registered consumer numbers
                </CardDescription>
              </div>
              {!isAddingConsumer ? (
                <Button onClick={() => setIsAddingConsumer(true)} className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Consumer
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsAddingConsumer(false)} className="w-full sm:w-auto">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isAddingConsumer && (
              <Card className="mb-4 border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-base">Add New Consumer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consumerNumber">Consumer Number</Label>
                      <Input
                        id="consumerNumber"
                        value={newConsumerNumber}
                        onChange={(e) => setNewConsumerNumber(e.target.value)}
                        placeholder="MH123456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consumerName">Name</Label>
                      <Input
                        id="consumerName"
                        value={newConsumerName}
                        onChange={(e) => setNewConsumerName(e.target.value)}
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consumerAddress">Address</Label>
                    <Input
                      id="consumerAddress"
                      value={newConsumerAddress}
                      onChange={(e) => setNewConsumerAddress(e.target.value)}
                      placeholder="Full Address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consumerCategory">Category</Label>
                    <select
                      id="consumerCategory"
                      value={newConsumerCategory}
                      onChange={(e) => setNewConsumerCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                  <Button onClick={handleAddConsumer} disabled={isSaving} className="w-full">
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Add Consumer
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {consumers.map((consumer) => (
                <Card key={consumer.consumerNumber} className="glass-card border">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-mono font-semibold text-sm sm:text-base">{consumer.consumerNumber}</p>
                          <Badge variant={consumer.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                            {consumer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{consumer.address}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{consumer.category}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveConsumer(consumer.consumerNumber)}
                        disabled={isRemoving === consumer.consumerNumber}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {isRemoving === consumer.consumerNumber ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
