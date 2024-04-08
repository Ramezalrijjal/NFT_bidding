// export const getComments = async () => {
  // return [
  //   {
  //           id: "1",
  //           body: "What the NTF ?",
  //           username: "Sara",
  //           userId: "1",
  //           parentId: null,
  //           createdAt: "2021-08-16T23:00:33.010+02:00",
  //         },
  //         {
  //           id: "2",
  //           body: "Whay is popular?",
  //           username: "Ali",
  //           userId: "2",
  //           parentId: null,
  //           createdAt: "2021-08-16T23:00:33.010+02:00",
  //         },
  //         {
  //           id: "3",
  //           body: "image",
  //           username: "Ahmad",
  //           userId: "2",
  //           parentId: "1",
  //           createdAt: "2021-08-16T23:00:33.010+02:00",
  //         },
  //         {
  //           id: "4",
  //           body: "great",
  //           username: "wala",
  //           userId: "2",
  //           parentId: "2",
  //           createdAt: "2021-08-16T23:00:33.010+02:00",
  //         },
  // ];
// };

// export const createComment = async (text, parentId = null) => {
//   return {
//     id: Math.random().toString(36).substr(2, 9),
//     body: text,
//     parentId,
//     userId: "1",
//     username: "John",
//     createdAt: new Date().toISOString(),
//   };
// };

// export const updateComment = async (text) => {
//   return { text };
// };

// export const deleteComment = async () => {
//   return {};
// };


// Set this variable to true to use mock data or false to make API requests
const useMockData = false; // Set this to false when you want to use real API requests

export const getComments = async () => {
  if (useMockData) {
    return [
        {
                id: "1",
                body: "What the NTF ?",
                username: "Sara",
                userId: "1",
                parentId: null,
                createdAt: "2021-08-16T23:00:33.010+02:00",
              },
              {
                id: "2",
                body: "Whay is popular?",
                username: "Ali",
                userId: "2",
                parentId: null,
                createdAt: "2021-08-16T23:00:33.010+02:00",
              },
              {
                id: "3",
                body: "image",
                username: "Ahmad",
                userId: "2",
                parentId: "1",
                createdAt: "2021-08-16T23:00:33.010+02:00",
              },
              {
                id: "4",
                body: "great",
                username: "wala",
                userId: "2",
                parentId: "2",
                createdAt: "2021-08-16T23:00:33.010+02:00",
              },
      ];
  }

  try {
    const response = await fetch('https://64db1943593f57e435b06f42.mockapi.io/comments'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const data = await response.json();
    // console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};


export const createComment = async (text, parentId = null, currentUserId, userName) => {
  if (useMockData) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: currentUserId, // Pass the user ID
      username: userName, // Pass the username
      createdAt: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch('https://64db1943593f57e435b06f42.mockapi.io/comments', {
      method: 'POST',
      body: JSON.stringify({ body: text, parentId, userId: currentUserId, username: userName }), // Include the user ID and username
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create a comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating a comment:', error);
    throw error;
  }
};

export const updateComment = async (text,commentId) => {
  if (useMockData) {
    return { text };
  }

  try {
    const response = await fetch(`https://64db1943593f57e435b06f42.mockapi.io/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update the comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating the comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  if (useMockData) {
    return {}; // Mocked deletion response
  }

  try {
    const response = await fetch(`https://64db1943593f57e435b06f42.mockapi.io/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting the comment:', error);
    throw error;
  }
};


