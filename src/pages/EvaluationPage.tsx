import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertTriangle, ArrowRight, ArrowLeft, CheckCircle, Heart, Shield } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { EvaluationFormData, SYMPTOM_OPTIONS, MEDICAL_CONDITIONS } from '../types';
import { profileAPI } from '../services/api';
import { useSession } from '../hooks/useLocalStorage';

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { sessionId, setUserProfile } = useSession();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<EvaluationFormData>({
    defaultValues: {
      sintomiAssociati: [],
      condizioniNote: [],
      intensita: 5,
      consensoInformato: false,
      consensoPrivacy: false
    }
  });

  const watchedValues = watch();
  const totalSteps = 5;

  // Salva automaticamente il profilo mentre l'utente compila
  useEffect(() => {
    if (sessionId && currentStep > 1) {
      const profileData = {
        sessionId,
        ...watchedValues
      };
      setUserProfile(profileData);
    }
  }, [watchedValues, sessionId, setUserProfile, currentStep]);

  const onSubmit = async (data: EvaluationFormData) => {
    if (!data.consensoInformato || !data.consensoPrivacy) {
      alert('Devi accettare i consensi per procedere.');
      return;
    }

    setLoading(true);
    try {
      if (sessionId) {
        await profileAPI.createProfile(sessionId, data);
        setUserProfile(data);
        navigate('/chat');
      }
    } catch (error) {
      console.error('Errore nel salvataggio del profilo:', error);
      alert('Errore nel salvataggio. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Passaggio {currentStep} di {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% completato
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Informazioni di Base
        </h2>
        <p className="text-gray-600">
          Iniziamo raccogliendo alcune informazioni di base per personalizzare la tua esperienza.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fascia d'Età *
          </label>
          <select 
            {...register('eta', { required: 'Seleziona la tua fascia d\'età' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleziona...</option>
            <option value="<12">Meno di 12 anni</option>
            <option value="12-18">12-18 anni</option>
            <option value="19-30">19-30 anni</option>
            <option value="31-50">31-50 anni</option>
            <option value="51-70">51-70 anni</option>
            <option value=">70">Oltre 70 anni</option>
          </select>
          {errors.eta && <p className="text-red-600 text-sm mt-1">{errors.eta.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genere
          </label>
          <select 
            {...register('genere')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleziona...</option>
            <option value="maschio">Maschio</option>
            <option value="femmina">Femmina</option>
            <option value="altro">Altro</option>
            <option value="preferisco-non-dire">Preferisco non dire</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
          Continua
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sintomo Principale
        </h2>
        <p className="text-gray-600">
          Descrivi il sintomo che ti preoccupa di più o che ti ha portato qui.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qual è il tuo sintomo principale? *
        </label>
        <input
          type="text"
          list="symptoms"
          {...register('sintomoprincipale', { required: 'Inserisci il sintomo principale' })}
          placeholder="es. mal di testa, febbre, dolore toracico..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <datalist id="symptoms">
          {SYMPTOM_OPTIONS.map(symptom => (
            <option key={symptom} value={symptom} />
          ))}
        </datalist>
        {errors.sintomoprincipale && <p className="text-red-600 text-sm mt-1">{errors.sintomoprincipale.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Da quanto tempo? *
          </label>
          <select 
            {...register('durata', { required: 'Seleziona la durata' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleziona...</option>
            <option value="1-giorno">Oggi (meno di 24 ore)</option>
            <option value="2-3-giorni">2-3 giorni</option>
            <option value="piu-3-giorni">Più di 3 giorni</option>
            <option value="cronico">Cronico (settimane/mesi)</option>
          </select>
          {errors.durata && <p className="text-red-600 text-sm mt-1">{errors.durata.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intensità percepita: {watchedValues.intensita}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            {...register('intensita')}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Lieve</span>
            <span>Moderata</span>
            <span>Severa</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="ghost" icon={ArrowLeft}>
          Indietro
        </Button>
        <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
          Continua
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sintomi Associati
        </h2>
        <p className="text-gray-600">
          Seleziona tutti gli altri sintomi che stai sperimentando (opzionale).
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SYMPTOM_OPTIONS.map(symptom => (
          <label key={symptom} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              value={symptom}
              {...register('sintomiAssociati')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 capitalize">{symptom}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="ghost" icon={ArrowLeft}>
          Indietro
        </Button>
        <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
          Continua
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Anamnesi Medica
        </h2>
        <p className="text-gray-600">
          Queste informazioni ci aiutano a fornirti consigli più precisi e personalizzati.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Condizioni mediche note (seleziona tutte quelle applicabili)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MEDICAL_CONDITIONS.map(condition => (
            <label key={condition} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                value={condition}
                {...register('condizioniNote')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Familiarità o predisposizioni ereditarie (opzionale)
        </label>
        <textarea
          {...register('familiarita')}
          placeholder="es. diabete in famiglia, allergie, malattie cardiache..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="ghost" icon={ArrowLeft}>
          Indietro
        </Button>
        <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
          Continua
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Consensi e Privacy
        </h2>
        <p className="text-gray-600">
          Prima di iniziare, leggi attentamente e accetta i seguenti consensi.
        </p>
      </div>

      {/* Disclaimer Medico */}
      <Card className="border-yellow-200 bg-yellow-50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Importante Disclaimer Medico
            </h3>
            <p className="text-yellow-700 text-sm leading-relaxed">
              MedAgent è uno strumento di supporto educativo e NON sostituisce il parere medico professionale. 
              Per emergenze mediche contatta immediatamente il 118. Le informazioni fornite non costituiscono 
              diagnosi medica e non devono essere utilizzate come sostituto di una consultazione medica qualificata.
            </p>
          </div>
        </div>
      </Card>

      {/* Consensi */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
          <input
            type="checkbox"
            {...register('consensoInformato', { required: 'Devi accettare il consenso informato' })}
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Consenso Informato *</span>
            <p className="text-sm text-gray-600 mt-1">
              Comprendo che MedAgent è un assistente AI per scopi educativi e di orientamento. 
              Accetto che non costituisce parere medico professionale e che per problemi di salute 
              devo consultare un medico qualificato.
            </p>
          </div>
        </label>
        {errors.consensoInformato && <p className="text-red-600 text-sm">{errors.consensoInformato.message}</p>}

        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
          <input
            type="checkbox"
            {...register('consensoPrivacy', { required: 'Devi accettare la privacy policy' })}
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-900">Privacy e Trattamento Dati *</span>
            <p className="text-sm text-gray-600 mt-1">
              Accetto il trattamento dei miei dati secondo la Privacy Policy. 
              I dati sono pseudonimizzati, crittografati e cancellati automaticamente dopo 30 giorni. 
              Nessun dato personale identificativo è memorizzato.
            </p>
          </div>
        </label>
        {errors.consensoPrivacy && <p className="text-red-600 text-sm">{errors.consensoPrivacy.message}</p>}
      </div>

      {/* Garanzie di Sicurezza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm text-green-800">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <Heart className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-blue-800">AI Etica e Sicura</span>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="ghost" icon={ArrowLeft}>
          Indietro
        </Button>
        <Button 
          onClick={handleSubmit(onSubmit)} 
          loading={loading}
          icon={CheckCircle} 
          iconPosition="right"
        >
          Inizia Consultazione
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Valutazione Sintomatica Guidata
            </h1>
            <p className="text-xl text-gray-600">
              Rispondi alle domande per ricevere un supporto personalizzato dal nostro assistente AI.
            </p>
          </div>

          <Card glassmorphism className="max-w-3xl mx-auto">
            {renderProgressBar()}
            
            <form>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default EvaluationPage;