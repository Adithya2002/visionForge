import React from 'react'
import ModelTrainingForm from '@/components/models/ModelTrainingForm'

const ModelTrainingPage = () => {
  return (
    <section className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Train model</h1>
      <p className='text-muted-foreground mb-6'>
        Train a new model with your own images
      </p>
      <ModelTrainingForm/>


    </section>
  )
}

export default ModelTrainingPage