"use server";

import { HTTPError } from "ky";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import { auth } from "~/libraries/nextauth/authConfig";

/**
 * Deletes the authenticated user's account.
 *
 * @async
 * @function deleteAccount
 * @throws {Error} Throws an error if the user is not authenticated.
 * @throws {Error} Throws an error with message "404 NOT FOUND" if the account is not found on the server.
 * @throws {HTTPError} Re-throws any other HTTP errors encountered during the request.
 * @returns {Promise<void>} Resolves to `void` upon successful account deletion.
 */
export const deleteAccount = async (): Promise<void> => {
  const session = await auth();

  if (!session?.user?.id) throw new Error("User not authenticated");

  try {
    await pcomparatorApiClient.delete(`user/${session?.user?.id}/account/delete`).json();
  } catch (err) {
    if (err instanceof HTTPError) {
      switch (err.response.status) {
        case 404: {
          console.log("Not Found");
          throw new Error("404 NOT FOUND");
        }
      }
    }
    throw err;
  }
};
