import {apiSlice} from './apiSlice'
const BLOG_COMMENT_URL='api/posts/';

console.log("commentReplyApiSlice")
export const commentReplyApiSlice=apiSlice.injectEndpoints({


    endpoints:(builder)=>({

        getComments:builder.query({
            query: (postId)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}/comments`,
                method:'GET',
                credentials: "include",
            }), 
            providesTags:['Comments']
        }),
        createComments:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/${data.id}/comments`,
                method:'POST',
                body:data,
                credentials: "include",
                mode: 'cors',

            }) ,
            invalidatesTags:['Comments']
        }),
        updateComment:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/comments/${data.commentId}`,
                method:'PUT',
                body:data,
                credentials: "include",
            }),
            invalidatesTags:['Comments']

        }),
        deleteComment:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/comments/${data.commentId}`,
                method:'DELETE',
                body:data,
                credentials: "include",
           
            }) ,
            invalidatesTags:['Comments']

        }),
        getReply:builder.query({
            query: (commentId)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/${commentId}/replies`,
                method:'GET',
            })    
        }),
        createReply:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/${data.commentId}/replies`,
                method:'PUT',
                credentials: "include",
                body:data,

            }), 
            invalidatesTags:['Comments']

        }),
        updateReply:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/replies/${data.replyId}`,
                method:'PUT',
                body:data,
                credentials: "include",

            }), 
            invalidatesTags:['Comments'] 
        }),
        deleteReply:builder.mutation({
            query: (data)=>({
                url:`${process.env.REACT_APP_BACKEND_URL}/api/posts/replies/${data.replyId}`,
                method:'DELETE',
                credentials: "include",
                body:data,

            }), 
            invalidatesTags:['Comments'] 
           
        })

    })
})
export const {useGetCommentsQuery,useCreateCommentsMutation,useUpdateCommentMutation,useDeleteCommentMutation,
            useGetReplyQuery,useCreateReplyMutation,useUpdateReplyMutation,useDeleteReplyMutation
}
=commentReplyApiSlice
