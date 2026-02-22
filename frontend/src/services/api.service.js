import axios from 'axios'
import { CONFIG } from '../utils/constants'

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: CONFIG.API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })
  }

  setToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeToken() {
    delete this.client.defaults.headers.common['Authorization']
  }

  // Auth
  async login(credentials) {
    const { data } = await this.client.post('/api/auth/login', credentials)
    return data
  }

  async register(userData) {
    const { data } = await this.client.post('/api/auth/register', userData)
    return data
  }

  async refreshToken(refreshToken) {
    const { data } = await this.client.post('/api/auth/refresh', { refreshToken })
    return data
  }

  // Users
  async getProfile() {
    const { data } = await this.client.get('/api/users/profile')
    return data
  }

  async updateProfile(profileData) {
    const { data } = await this.client.patch('/api/users/profile', profileData)
    return data
  }

  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)
    
    const { data } = await this.client.post('/api/users/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  async getNearbyUsers(params) {
    const { data } = await this.client.get('/api/users/nearby', { params })
    return data
  }

  async likeUser(userId) {
    const { data } = await this.client.post('/api/users/like', { userId })
    return data
  }

  async passUser(userId) {
    const { data } = await this.client.post('/api/users/pass', { userId })
    return data
  }

  // Coros
  async getCoros(params) {
    const { data } = await this.client.get('/api/coros', { params })
    return data
  }

  async createCoro(coroData) {
    const { data } = await this.client.post('/api/coros', coroData)
    return data
  }

  async joinCoro(coroId) {
    const { data } = await this.client.post(`/api/coros/${coroId}/join`)
    return data
  }

  // Chat
  async getConversations() {
    const { data } = await this.client.get('/api/chat/conversations')
    return data
  }

  async getMessages(conversationId, params) {
    const { data } = await this.client.get(`/api/chat/conversations/${conversationId}/messages`, { params })
    return data
  }

  async sendMessage(conversationId, messageData) {
    const { data } = await this.client.post(`/api/chat/conversations/${conversationId}/messages`, messageData)
    return data
  }

  // Gifts
  async getGifts() {
    const { data } = await this.client.get('/api/gifts')
    return data
  }

  async sendGift(recipientId, giftId) {
    const { data } = await this.client.post('/api/gifts/send', { recipientId, giftId })
    return data
  }

  async getBalance() {
    const { data } = await this.client.get('/api/gifts/balance')
    return data
  }

  // After Party
  async activateAfterParty(location) {
    const { data } = await this.client.post('/api/afterparty/activate', { location })
    return data
  }

  async deactivateAfterParty() {
    const { data } = await this.client.post('/api/afterparty/deactivate')
    return data
  }

  // Jartura
  async getNearbyRestaurants(params) {
    const { data } = await this.client.get('/api/jartura/nearby', { params })
    return data
  }
}

export const apiService = new ApiService()
