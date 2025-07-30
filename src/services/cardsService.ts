// src/services/cardsService.ts
import axios from "axios";
import { Card } from "../interfaces/cards/Cards";
import { errorMessage } from "./feedbackService";

const API: string = import.meta.env.VITE_CARDS_API;

// get all cards
export function getAllCards() {
  return axios.get(API).catch((error) => {
    if (error.response && error.response.data) {
      errorMessage(error.response.data);
      throw error;
    } else {
      errorMessage("An unexpected error occurred.");
      throw error;
    }
  });
}

// get card by id
export function getCardById(card_id: string) {
  return axios.get(`${API}/${card_id}`);
}

// post new card
export function postNewCard(normalizedCard: Card) {
  return axios.post(API, normalizedCard, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token") ?? "",
    },
  });
}

// update card likes
export function updateCardLikes(cardId: string, token: string) {
  return axios.patch(
    `${API}/${cardId}`,
    {},
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
}

// update card delete
export function updateCardDeleted(
  cardId: string,
  bizNumber: number,
  token: string
) {
  return axios.delete(`${API}/${cardId}`, {
    headers: {
      "x-auth-token": token,
    },
    data: {
      bizNumber: bizNumber,
    },
  });
}

export async function updateCardEdited(
  cardId: string,
  cardEdited: Card,
  token: string
) {
  try {
    console.log("cardEdited:", cardEdited);
    const response = await axios.put(`${API}/${cardId}`, cardEdited, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
}
